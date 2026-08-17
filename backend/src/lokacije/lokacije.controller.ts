import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { LokacijeService } from './lokacije.service';
import { AzurirajLokacijuDto } from './dto/azuriraj-lokacije.dto';
import { DodajLokacijaDto } from './dto/dodaj-lokacije.dto';
import { FiltrirajLokacijeDto } from './dto/filtriraj-lokacije.dto';
import { DodajSlikuDto } from './dto/dodaj-sliku.dto';
import { AzurirajSlikuLokacijeDto } from './dto/azuriraj-sliku-lokacije.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UlogeGuard } from 'src/auth/uloge.guard';
import { Uloge } from 'src/auth/uloge.decorator';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('lokacije')
export class LokacijeController {
  constructor(private readonly lokacijeServis: LokacijeService) {}

  @Get()
  dohvatiSve(@Query() filter: FiltrirajLokacijeDto) {
    return this.lokacijeServis.dohvatiSve(filter);
  }

  @Get(':id')
  dohvatiJednu(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.dohvatiJednu(id);
  }

  @Get(':id/slike')
  dohvatiSlikeZaLokaciju(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.dohvatiSlikeZaLokaciju(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/moj-dolazak')
  dohvatiMojDolazakZaLokaciju(
    @Param('id', ParseIntPipe) lokacijaId: number,
    @Req() req: any,
  ) {
    return this.lokacijeServis.dohvatiMojDolazakZaLokaciju(
      lokacijaId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/rijesene')
  dohvatiRijeseneLokacija(@Req() req: any) {
    return this.lokacijeServis.dohvatiRijeseneLokacije(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('ja/rijesene/:rijesenaLokacijaId')
  dohvatiRijesenuLokaciju(
    @Param('rijesenaLokacijaId', ParseIntPipe) rijesenaLokacijaId: number,
    @Req() req: any,
  ) {
    return this.lokacijeServis.dohvatiRijesenuLokaciju(
      rijesenaLokacijaId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Post()
  dodajLokaciju(@Body() dto: DodajLokacijaDto, @Req() req: any) {
    return this.lokacijeServis.dodajLokaciju(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Post(':id/slike')
  dodajSlikeZaLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DodajSlikuDto,
  ) {
    return this.lokacijeServis.dodajSlikuZaLokaciju(id, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Post(':id/slike/upload')
  @UseInterceptors(
    FileInterceptor('slika', {
      storage: diskStorage({
        destination: join(process.cwd(), 'prijenos', 'lokacije'),
        filename: (req, file, callback) => {
          const jedinstveniNaziv = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

          callback(null, jedinstveniNaziv);
        },
      }),
    }),
  )
  dodajUploadSlikuZaLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() slika: Express.Multer.File,
    @Body('opisSlike') opisSlike?: string,
    @Body('glavna') glavna?: string,
  ) {
    return this.lokacijeServis.dodajSlikuZaLokaciju(id, {
      putanjaSlike: `/prijenos/lokacije/${slika.filename}`,
      opisSlike,
      glavna: glavna === 'true',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post(':lokacijaId/rijesi')
  @UseInterceptors(
    FilesInterceptor('slike', 5, {
      storage: diskStorage({
        destination: join(process.cwd(), 'prijenos', 'posjeti'),
        filename: (req, file, callback) => {
          const naziv = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;
          callback(null, naziv);
        },
      }),
    }),
  )
  zabiljesiRijesenuLokaciju(
    @Param('lokacijaId', ParseIntPipe) lokacijaId: number,
    @Req() req: any,
    @Body('biljeska') biljeska?: string,
    @UploadedFiles() slike?: Express.Multer.File[],
  ) {
    return this.lokacijeServis.zabiljeziRijesenuLokaciju(
      lokacijaId,
      req.user.userId,
      biljeska,
      slike ?? [],
    );
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Patch(':id')
  azurirajLokaciju(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AzurirajLokacijuDto,
  ) {
    return this.lokacijeServis.azurirajLokaciju(id, dto);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Patch(':id/popularnost')
  izmijeniPopularnostLokacija(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.izmijeniPopularnostLokacija(id);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Patch(':id/slike/:slikaId')
  azurirajPodatkeSlike(
    @Param('id', ParseIntPipe) lokacijaId: number,
    @Param('slikaId', ParseIntPipe) slikaId: number,
    @Body() dto: AzurirajSlikuLokacijeDto,
  ) {
    return this.lokacijeServis.azurirajSlikuZaLokaciju(
      lokacijaId,
      slikaId,
      dto,
    );
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Delete(':id')
  obrisiLokaciju(@Param('id', ParseIntPipe) id: number) {
    return this.lokacijeServis.obrisi(id);
  }

  @UseGuards(JwtAuthGuard, UlogeGuard)
  @Uloge(2)
  @Delete(':id/slike/:slikaId')
  obrisiSlikuZaLokaciju(
    @Param('id', ParseIntPipe) lokacijaId: number,
    @Param('slikaId', ParseIntPipe) slikaId: number,
  ) {
    return this.lokacijeServis.obrisiSlikuZaLokaciju(lokacijaId, slikaId);
  }
}
