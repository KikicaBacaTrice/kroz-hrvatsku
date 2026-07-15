import { SetMetadata } from '@nestjs/common';

export const ULOGE_KEY = 'uloge';
export const Uloge = (...uloge: number[]) => SetMetadata(ULOGE_KEY, uloge);
