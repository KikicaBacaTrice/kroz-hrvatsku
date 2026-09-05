--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

-- Started on 2026-09-01 17:54:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17261)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 17369)
-- Name: dekoracija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dekoracija (
    dekoracija_id integer NOT NULL,
    naziv character varying(100) NOT NULL,
    opis character varying(255) NOT NULL,
    cijena_valuta integer,
    slika_dekoracija character varying(255) NOT NULL,
    tip_dekoracije_id integer NOT NULL,
    nacin_otkljucavanja_id integer NOT NULL
);


ALTER TABLE public.dekoracija OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 17368)
-- Name: dekoracija_dekoracija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dekoracija_dekoracija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dekoracija_dekoracija_id_seq OWNER TO postgres;

--
-- TOC entry 4989 (class 0 OID 0)
-- Dependencies: 232
-- Name: dekoracija_dekoracija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dekoracija_dekoracija_id_seq OWNED BY public.dekoracija.dekoracija_id;


--
-- TOC entry 223 (class 1259 OID 17301)
-- Name: kategorija_lokacije; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.kategorija_lokacije (
    kategorija_id integer NOT NULL,
    naziv character varying(100) NOT NULL,
    opis character varying(1000)
);


ALTER TABLE public.kategorija_lokacije OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17300)
-- Name: kategorija_lokacije_kategorija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.kategorija_lokacije_kategorija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.kategorija_lokacije_kategorija_id_seq OWNER TO postgres;

--
-- TOC entry 4990 (class 0 OID 0)
-- Dependencies: 222
-- Name: kategorija_lokacije_kategorija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.kategorija_lokacije_kategorija_id_seq OWNED BY public.kategorija_lokacije.kategorija_id;


--
-- TOC entry 219 (class 1259 OID 17280)
-- Name: korisnik; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.korisnik (
    korisnik_id integer NOT NULL,
    ime character varying(50),
    prezime character varying(50),
    korisnicko_ime character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    lozinka_hash character varying(255) NOT NULL,
    uloga_id integer NOT NULL
);


ALTER TABLE public.korisnik OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 17378)
-- Name: korisnik_dekoracija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.korisnik_dekoracija (
    korisnik_dekoracija_id integer NOT NULL,
    datum_dobivanja timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    aktivna boolean DEFAULT false NOT NULL,
    pozicija_prikaza integer,
    dekoracija_id integer NOT NULL,
    korisnik_id integer NOT NULL
);


ALTER TABLE public.korisnik_dekoracija OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 17377)
-- Name: korisnik_dekoracija_korisnik_dekoracija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_dekoracija_korisnik_dekoracija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_dekoracija_korisnik_dekoracija_id_seq OWNER TO postgres;

--
-- TOC entry 4991 (class 0 OID 0)
-- Dependencies: 234
-- Name: korisnik_dekoracija_korisnik_dekoracija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.korisnik_dekoracija_korisnik_dekoracija_id_seq OWNED BY public.korisnik_dekoracija.korisnik_dekoracija_id;


--
-- TOC entry 218 (class 1259 OID 17279)
-- Name: korisnik_korisnik_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_korisnik_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_korisnik_id_seq OWNER TO postgres;

--
-- TOC entry 4992 (class 0 OID 0)
-- Dependencies: 218
-- Name: korisnik_korisnik_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.korisnik_korisnik_id_seq OWNED BY public.korisnik.korisnik_id;


--
-- TOC entry 239 (class 1259 OID 17396)
-- Name: korisnik_postignuce; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.korisnik_postignuce (
    korisnik_postignuce_id integer NOT NULL,
    datum_otkljucavanja timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    postignuce_id integer NOT NULL,
    korisnik_id integer NOT NULL
);


ALTER TABLE public.korisnik_postignuce OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 17395)
-- Name: korisnik_postignuce_korisnik_postignuce_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.korisnik_postignuce_korisnik_postignuce_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.korisnik_postignuce_korisnik_postignuce_id_seq OWNER TO postgres;

--
-- TOC entry 4993 (class 0 OID 0)
-- Dependencies: 238
-- Name: korisnik_postignuce_korisnik_postignuce_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.korisnik_postignuce_korisnik_postignuce_id_seq OWNED BY public.korisnik_postignuce.korisnik_postignuce_id;


--
-- TOC entry 225 (class 1259 OID 17310)
-- Name: lokacija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lokacija (
    lokacija_id integer NOT NULL,
    naziv character varying(200) NOT NULL,
    opis text,
    adresa character varying(200) NOT NULL,
    grad character varying(200) NOT NULL,
    zupanija character varying(200) NOT NULL,
    ulaznica_cijena numeric(10,2),
    datum_dodavanja timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    geo_sirina numeric(9,6) NOT NULL,
    geo_duzina numeric(9,6) NOT NULL,
    nagrada_xp integer DEFAULT 0 NOT NULL,
    nagrada_valuta integer DEFAULT 0 NOT NULL,
    dodao_korisnik_id integer NOT NULL,
    kategorija_id integer NOT NULL,
    je_popularna boolean DEFAULT false NOT NULL,
    broj_ocjena integer DEFAULT 0 NOT NULL,
    prosjecna_ocjena double precision
);


ALTER TABLE public.lokacija OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 17309)
-- Name: lokacija_lokacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lokacija_lokacija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lokacija_lokacija_id_seq OWNER TO postgres;

--
-- TOC entry 4994 (class 0 OID 0)
-- Dependencies: 224
-- Name: lokacija_lokacija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lokacija_lokacija_id_seq OWNED BY public.lokacija.lokacija_id;


--
-- TOC entry 231 (class 1259 OID 17362)
-- Name: nacin_otkljucavanja; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nacin_otkljucavanja (
    nacin_otkljucavanja_id integer NOT NULL,
    naziv character varying(100) NOT NULL
);


ALTER TABLE public.nacin_otkljucavanja OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 17361)
-- Name: nacin_otkljucavanja_nacin_otkljucavanja_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nacin_otkljucavanja_nacin_otkljucavanja_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nacin_otkljucavanja_nacin_otkljucavanja_id_seq OWNER TO postgres;

--
-- TOC entry 4995 (class 0 OID 0)
-- Dependencies: 230
-- Name: nacin_otkljucavanja_nacin_otkljucavanja_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nacin_otkljucavanja_nacin_otkljucavanja_id_seq OWNED BY public.nacin_otkljucavanja.nacin_otkljucavanja_id;


--
-- TOC entry 237 (class 1259 OID 17387)
-- Name: postignuce; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.postignuce (
    postignuce_id integer NOT NULL,
    naziv character varying(100) NOT NULL,
    opis character varying(255),
    broj_potrebnih_lokacija integer NOT NULL,
    nagrada_xp integer DEFAULT 0 NOT NULL,
    nagrada_valuta integer DEFAULT 0 NOT NULL,
    kategorija_id integer NOT NULL,
    dekoracija_id integer
);


ALTER TABLE public.postignuce OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 17386)
-- Name: postignuce_postignuce_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.postignuce_postignuce_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.postignuce_postignuce_id_seq OWNER TO postgres;

--
-- TOC entry 4996 (class 0 OID 0)
-- Dependencies: 236
-- Name: postignuce_postignuce_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.postignuce_postignuce_id_seq OWNED BY public.postignuce.postignuce_id;


--
-- TOC entry 241 (class 1259 OID 17404)
-- Name: povratna_informacija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.povratna_informacija (
    povratna_informacija_id integer NOT NULL,
    tekst character varying(1000) NOT NULL,
    ocjena integer NOT NULL,
    datum timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    korisnik_id integer NOT NULL,
    lokacija_id integer NOT NULL
);


ALTER TABLE public.povratna_informacija OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 17403)
-- Name: povratna_informacija_povratna_informacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.povratna_informacija_povratna_informacija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.povratna_informacija_povratna_informacija_id_seq OWNER TO postgres;

--
-- TOC entry 4997 (class 0 OID 0)
-- Dependencies: 240
-- Name: povratna_informacija_povratna_informacija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.povratna_informacija_povratna_informacija_id_seq OWNED BY public.povratna_informacija.povratna_informacija_id;


--
-- TOC entry 221 (class 1259 OID 17289)
-- Name: profil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profil (
    profil_id integer NOT NULL,
    opis_profila character varying(1000),
    razina integer DEFAULT 1 NOT NULL,
    xp_bodovi integer DEFAULT 0 NOT NULL,
    virtualni_novac integer DEFAULT 0 NOT NULL,
    korisnik_id integer NOT NULL,
    profilna_slika_url character varying(255)
);


ALTER TABLE public.profil OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17288)
-- Name: profil_profil_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profil_profil_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.profil_profil_id_seq OWNER TO postgres;

--
-- TOC entry 4998 (class 0 OID 0)
-- Dependencies: 220
-- Name: profil_profil_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profil_profil_id_seq OWNED BY public.profil.profil_id;


--
-- TOC entry 227 (class 1259 OID 17333)
-- Name: rijesena_lokacija; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rijesena_lokacija (
    rijesena_lokacija_id integer NOT NULL,
    datum_vrijeme_posjeta timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    biljeska character varying(1000),
    broj_osvojenih_xp integer DEFAULT 0 NOT NULL,
    broj_osvojene_valute integer DEFAULT 0 NOT NULL,
    korisnik_id integer NOT NULL,
    lokacija_id integer NOT NULL
);


ALTER TABLE public.rijesena_lokacija OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 17332)
-- Name: rijesena_lokacija_rijesena_lokacija_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rijesena_lokacija_rijesena_lokacija_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rijesena_lokacija_rijesena_lokacija_id_seq OWNER TO postgres;

--
-- TOC entry 4999 (class 0 OID 0)
-- Dependencies: 226
-- Name: rijesena_lokacija_rijesena_lokacija_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rijesena_lokacija_rijesena_lokacija_id_seq OWNED BY public.rijesena_lokacija.rijesena_lokacija_id;


--
-- TOC entry 243 (class 1259 OID 18015)
-- Name: slika_lokacije; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slika_lokacije (
    slika_id integer NOT NULL,
    putanja_slike character varying(255) NOT NULL,
    opis_slike character varying(255),
    datum_dodavanja timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    glavna boolean DEFAULT false NOT NULL,
    lokacija_id integer NOT NULL
);


ALTER TABLE public.slika_lokacije OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 18014)
-- Name: slika_lokacije_slika_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slika_lokacije_slika_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.slika_lokacije_slika_id_seq OWNER TO postgres;

--
-- TOC entry 5000 (class 0 OID 0)
-- Dependencies: 242
-- Name: slika_lokacije_slika_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slika_lokacije_slika_id_seq OWNED BY public.slika_lokacije.slika_id;


--
-- TOC entry 245 (class 1259 OID 18026)
-- Name: slika_posjeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.slika_posjeta (
    slika_id integer NOT NULL,
    putanja_slike character varying(255) NOT NULL,
    opis_slike character varying(255),
    datum_dodavanja timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    rijesena_lokacija_id integer NOT NULL
);


ALTER TABLE public.slika_posjeta OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 18025)
-- Name: slika_posjeta_slika_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.slika_posjeta_slika_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.slika_posjeta_slika_id_seq OWNER TO postgres;

--
-- TOC entry 5001 (class 0 OID 0)
-- Dependencies: 244
-- Name: slika_posjeta_slika_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.slika_posjeta_slika_id_seq OWNED BY public.slika_posjeta.slika_id;


--
-- TOC entry 229 (class 1259 OID 17355)
-- Name: tip_dekoracije; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tip_dekoracije (
    tip_dekoracije_id integer NOT NULL,
    naziv character varying(100) NOT NULL,
    max_aktivnih integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.tip_dekoracije OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 17354)
-- Name: tip_dekoracije_tip_dekoracije_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tip_dekoracije_tip_dekoracije_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tip_dekoracije_tip_dekoracije_id_seq OWNER TO postgres;

--
-- TOC entry 5002 (class 0 OID 0)
-- Dependencies: 228
-- Name: tip_dekoracije_tip_dekoracije_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tip_dekoracije_tip_dekoracije_id_seq OWNED BY public.tip_dekoracije.tip_dekoracije_id;


--
-- TOC entry 217 (class 1259 OID 17271)
-- Name: uloga; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.uloga (
    uloga_id integer NOT NULL,
    naziv character varying(50) NOT NULL,
    opis character varying(1000)
);


ALTER TABLE public.uloga OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17270)
-- Name: uloga_uloga_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.uloga_uloga_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.uloga_uloga_id_seq OWNER TO postgres;

--
-- TOC entry 5003 (class 0 OID 0)
-- Dependencies: 216
-- Name: uloga_uloga_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.uloga_uloga_id_seq OWNED BY public.uloga.uloga_id;


--
-- TOC entry 4730 (class 2604 OID 17372)
-- Name: dekoracija dekoracija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dekoracija ALTER COLUMN dekoracija_id SET DEFAULT nextval('public.dekoracija_dekoracija_id_seq'::regclass);


--
-- TOC entry 4716 (class 2604 OID 17304)
-- Name: kategorija_lokacije kategorija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategorija_lokacije ALTER COLUMN kategorija_id SET DEFAULT nextval('public.kategorija_lokacije_kategorija_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 17283)
-- Name: korisnik korisnik_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik ALTER COLUMN korisnik_id SET DEFAULT nextval('public.korisnik_korisnik_id_seq'::regclass);


--
-- TOC entry 4731 (class 2604 OID 17381)
-- Name: korisnik_dekoracija korisnik_dekoracija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_dekoracija ALTER COLUMN korisnik_dekoracija_id SET DEFAULT nextval('public.korisnik_dekoracija_korisnik_dekoracija_id_seq'::regclass);


--
-- TOC entry 4737 (class 2604 OID 17399)
-- Name: korisnik_postignuce korisnik_postignuce_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_postignuce ALTER COLUMN korisnik_postignuce_id SET DEFAULT nextval('public.korisnik_postignuce_korisnik_postignuce_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 17313)
-- Name: lokacija lokacija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija ALTER COLUMN lokacija_id SET DEFAULT nextval('public.lokacija_lokacija_id_seq'::regclass);


--
-- TOC entry 4729 (class 2604 OID 17365)
-- Name: nacin_otkljucavanja nacin_otkljucavanja_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nacin_otkljucavanja ALTER COLUMN nacin_otkljucavanja_id SET DEFAULT nextval('public.nacin_otkljucavanja_nacin_otkljucavanja_id_seq'::regclass);


--
-- TOC entry 4734 (class 2604 OID 17390)
-- Name: postignuce postignuce_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postignuce ALTER COLUMN postignuce_id SET DEFAULT nextval('public.postignuce_postignuce_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 17407)
-- Name: povratna_informacija povratna_informacija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.povratna_informacija ALTER COLUMN povratna_informacija_id SET DEFAULT nextval('public.povratna_informacija_povratna_informacija_id_seq'::regclass);


--
-- TOC entry 4712 (class 2604 OID 17292)
-- Name: profil profil_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil ALTER COLUMN profil_id SET DEFAULT nextval('public.profil_profil_id_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 17336)
-- Name: rijesena_lokacija rijesena_lokacija_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rijesena_lokacija ALTER COLUMN rijesena_lokacija_id SET DEFAULT nextval('public.rijesena_lokacija_rijesena_lokacija_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 18018)
-- Name: slika_lokacije slika_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_lokacije ALTER COLUMN slika_id SET DEFAULT nextval('public.slika_lokacije_slika_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 18029)
-- Name: slika_posjeta slika_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_posjeta ALTER COLUMN slika_id SET DEFAULT nextval('public.slika_posjeta_slika_id_seq'::regclass);


--
-- TOC entry 4727 (class 2604 OID 17358)
-- Name: tip_dekoracije tip_dekoracije_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_dekoracije ALTER COLUMN tip_dekoracije_id SET DEFAULT nextval('public.tip_dekoracije_tip_dekoracije_id_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 17274)
-- Name: uloga uloga_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uloga ALTER COLUMN uloga_id SET DEFAULT nextval('public.uloga_uloga_id_seq'::regclass);


--
-- TOC entry 4953 (class 0 OID 17261)
-- Dependencies: 215
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
6152d3a2-2504-4a86-92c0-9662a6b5486b	6cd63945ddd154fc2b5c1a31eb72e139b5fe9f61de72f28561b4c42a8e5d7975	2026-07-08 12:25:21.383593+02	20260708102521_init	\N	\N	2026-07-08 12:25:21.177828+02	1
d103ddf4-5b8b-4ef8-ad26-32e3baf7288c	8f6da4ff83c641440dc362263228dd71849c94d5449dedd697f14b9ba6743991	2026-07-08 12:29:44.441186+02	20260708102944_init	\N	\N	2026-07-08 12:29:44.324063+02	1
fb3963ac-6341-4d6a-ad9a-b79c9789a433	efb6b79e436a24ec273fcbf0829463e6d0c8b146adb310763a00747f219cbf05	2026-07-08 15:50:05.004766+02	20260708135004_init	\N	\N	2026-07-08 15:50:04.988963+02	1
5a2c7cb9-eb90-47dd-9b1c-72c32dedd515	84bc992a2fac1bb2ec9c5eee0dc4690aeb9a55f6baa0766a8d4c42daae1a1b9a	2026-07-10 18:26:03.525069+02	20260710162603_dodani_cascade_pravila_u_schemu	\N	\N	2026-07-10 18:26:03.473237+02	1
ef4a7de4-7f2b-4eff-913b-8e1eff21f364	7d14723882681d3fd4abd8d572c013d90b633e68fdb8a5de30c6c108b02139e9	2026-07-10 19:37:51.717268+02	20260710173751_dodani_atribut_je_popularan_za_lokaciju	\N	\N	2026-07-10 19:37:51.696764+02	1
484f43b2-a90a-40af-9aba-69d9bddfd7a7	ba1d5376bcdca5e79e89dfe1afaa8769556a082c01c04e5ccdb438d54df4eb62	2026-07-11 15:35:00.835289+02	20260711133500_dodan_max_broj_dekoracija_za_tip	\N	\N	2026-07-11 15:35:00.806567+02	1
44989a03-26b9-4255-bbd1-5237456acc4d	2c0165b03dbc4c2d5e1284ba9cf121d53707c9bcceff89e4eaeb4719a37388c9	2026-07-13 19:18:18.00436+02	20260713171817_dodan_atribut_prosjena_ocjena_i_broj_glasova_u_tablica_lokacija	\N	\N	2026-07-13 19:18:17.974554+02	1
dddb6353-ac98-4bcf-b57f-5c9c005f1655	f59ee7a5f6e089f724b899188e60c6ed733ea228274ebb237f33d8ea553deacb	2026-07-31 20:17:18.845105+02	20260731190000_opis_lokacije_text		\N	2026-07-31 20:17:18.845105+02	0
\.


--
-- TOC entry 4971 (class 0 OID 17369)
-- Dependencies: 233
-- Data for Name: dekoracija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dekoracija (dekoracija_id, naziv, opis, cijena_valuta, slika_dekoracija, tip_dekoracije_id, nacin_otkljucavanja_id) FROM stdin;
7	Osvajač dvoraca	Bedž postaje dostupan za kupnju nakon rješavanja 3 izazova vezana uz dvorce.	200	/prijenos/dekoracije/bedzevi/dvorac-3lokacije.png	2	2
8	Ljubitelj muzeja	Bedž postaje dostupan za kupnju nakon rješavanja 3 izazova vezana uz muzeje.	200	/prijenos/dekoracije/bedzevi/muzej-3lokacije.png	2	2
9	Planinar	Bedž postaje dostupan za kupnju nakon rješavanja 3 planinarska izazova.	200	/prijenos/dekoracije/bedzevi/planina-3lokacije.png	2	2
11	Avatar dekoracija 200	Dekoracija za profilnu sliku korisnika.	200	/prijenos/dekoracije/avatar/avatar200.png	1	2
12	Avatar dekoracija 400	Posebna dekoracija za profilnu sliku korisnika.	400	/prijenos/dekoracije/avatar/avatar400.png	1	2
13	Pozadina 200	Dekorativna pozadina korisničkog profila.	200	/prijenos/dekoracije/pozadine/pozadina200.png	3	2
14	Pozadina 500	Posebna dekorativna pozadina korisničkog profila.	500	/prijenos/dekoracije/pozadine/pozadina500.png	3	2
15	Čuvar prirode	Bedž postaje dostupan za kupnju nakon rješavanja 5 izazova vezana uz nacionalne parkova.	450	/prijenos/dekoracije/bedzevi/nacionalnipark-5lokacija.png	2	2
16	Jadranski istraživač	Bedž postaje dostupan za kupnju nakon rješavanja 2 izazova vezana uz plaže.	150	/prijenos/dekoracije/bedzevi/plaza-2lokacije.png	2	2
17	Pogled s vrha	Bedž postaje dostupan za kupnju nakon rješavanja 3 izazova vezana uz vidikovce.	225	/prijenos/dekoracije/bedzevi/vidikovac-3lokacije.png	2	2
\.


--
-- TOC entry 4961 (class 0 OID 17301)
-- Dependencies: 223
-- Data for Name: kategorija_lokacije; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.kategorija_lokacije (kategorija_id, naziv, opis) FROM stdin;
1	Dvorac	Povijesni dvorci i utvrde
2	Nacionalni park	Zaštićena prirodna područja
3	Muzej	Kulturne i povijesne zbirke
4	Plaža	Prirodne i uređene plaže
5	Vidikovac	Lokacije s panoramskim pogledom
6	Planina	Planinske lokacije
\.


--
-- TOC entry 4957 (class 0 OID 17280)
-- Dependencies: 219
-- Data for Name: korisnik; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.korisnik (korisnik_id, ime, prezime, korisnicko_ime, email, lozinka_hash, uloga_id) FROM stdin;
1	Ivo	Ivić	ivo123	ivo123@test.com	$2b$10$9O6BFY4xjKy9i0Evkr0XwO/sop5ADvl8VLxDc12jvAkjn0FMjYj7y	1
2	Pero	Peric	pperic123	admin@gmail.com	$2b$10$U4hzWCrJeXFa/u9E23325Ow5gvPzX/ik.7fSUdtk/lM6MDGOiZuAi	2
3	PPero	peric	p123peric	pero.peric123@gmail.com	$2b$10$0WZsMCPkwDiui/JvxlsHYO1yDbup67cO4XlDHPbUFbBivWtVIiCzi	1
\.


--
-- TOC entry 4973 (class 0 OID 17378)
-- Dependencies: 235
-- Data for Name: korisnik_dekoracija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.korisnik_dekoracija (korisnik_dekoracija_id, datum_dobivanja, aktivna, pozicija_prikaza, dekoracija_id, korisnik_id) FROM stdin;
5	2026-08-15 16:21:10.409	f	\N	12	2
4	2026-08-15 15:33:46.628	t	1	9	2
9	2026-08-19 20:11:06.801	f	\N	13	2
6	2026-08-15 16:41:52.969	t	1	14	2
\.


--
-- TOC entry 4977 (class 0 OID 17396)
-- Dependencies: 239
-- Data for Name: korisnik_postignuce; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.korisnik_postignuce (korisnik_postignuce_id, datum_otkljucavanja, postignuce_id, korisnik_id) FROM stdin;
1	2026-07-11 13:57:07.891	2	1
2	2026-08-10 17:00:49.672	2	2
\.


--
-- TOC entry 4963 (class 0 OID 17310)
-- Dependencies: 225
-- Data for Name: lokacija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lokacija (lokacija_id, naziv, opis, adresa, grad, zupanija, ulaznica_cijena, datum_dodavanja, geo_sirina, geo_duzina, nagrada_xp, nagrada_valuta, dodao_korisnik_id, kategorija_id, je_popularna, broj_ocjena, prosjecna_ocjena) FROM stdin;
3	Muzej prekinutih veza	Muzej prekinutih veza u Zagrebu jedinstveni je muzej posvećen propalim ljubavnim i drugim međuljudskim odnosima. Zbirku čine osobni predmeti koje su donirali ljudi iz različitih dijelova svijeta, uz kratke priče povezane s njihovim bivšim odnosima.	Ćirilometodska ulica 2	Zagreb	Grad Zagreb	7.00	2026-07-09 17:57:25.534	45.815200	15.973600	90	30	1	3	f	3	4.666666666666667
4	Zlatni rat	Zlatni rat jedna je od najpoznatijih hrvatskih plaža, smještena pokraj Bola na južnoj strani otoka Brača. Prepoznatljiva je po karakterističnom izduženom obliku koji se mijenja pod utjecajem vjetra, valova i morskih struja. Plaža je šljunčana i okružena borovom šumom te je popularna za kupanje i vodene sportove.	Put Zlatnog rata	Bol	Splitsko-dalmatinska	0.00	2026-07-09 17:57:30.416	43.255800	16.633800	110	35	1	4	f	0	\N
2	Nacionalni park Plitvička jezera	Nacionalni park Plitvička jezera najstariji je i najveći nacionalni park u Hrvatskoj. Poznat je po sustavu međusobno povezanih jezera, slapovima i bogatoj šumskoj vegetaciji, a njegova prirodna ljepota čini ga jednom od najpoznatijih hrvatskih turističkih destinacija	Josipa Jovića 19	Plitvička Jezera	Ličko-senjska	40.00	2026-07-09 17:57:20.182	44.904970	15.611190	200	70	1	2	f	0	\N
7	Nacionalni park Risnjak	Nacionalni park Risnjak smješten je u Gorskom kotaru i poznat je po gustim šumama, planinskim vrhovima Veliki Risnjak i Snježnik te izvoru rijeke Kupe. Park je stanište brojnih životinjskih vrsta, uključujući risa, vuka i smeđeg medvjeda.	Bijela Vodica 48	Crni Lug	Primorsko-goranska	0.00	2026-07-11 13:49:37.938	45.418200	14.686000	60	15	1	2	f	2	3.5
6	Sljeme	Sljeme je najviši vrh Medvednice, smješten iznad Zagreba. Popularno je odredište za planinarenje, biciklizam, skijanje i izlete tijekom cijele godine. Na vrhu se nalaze Zagrebački TV toranj, gornja stanica žičare i brojni planinarski objekti. Sljeme se nalazi na približno 1035 m nadmorske visine.	Sljemenska cesta	Zagreb	Grad Zagreb	0.00	2026-07-11 13:49:28.318	45.899200	15.948900	40	10	1	6	f	1	4
5	Biokovo Skywalk	Biokovo, poznat i kao Nebeska šetnica, stakleni je vidikovac u obliku potkove smješten na području Ravne Vlaške u Parku prirode Biokovo. Nalazi se na 1228 m nadmorske visine i pruža pogled na Makarsku rivijeru, Jadransko more i okolne otoke.	Biokovska cesta, Ravna Vlaška	Tučepi	Splitsko-dalmatinska	8.00	2026-07-09 17:57:32.209	43.285430	17.084790	150	50	1	5	f	2	4.5
13	Ivanščica	Ivanščica je najviša planina Hrvatskog zagorja i jedno od najpopularnijih planinarskih odredišta sjeverozapadne Hrvatske. Vrh se nalazi na oko 1060 m nadmorske visine, a uz njega se nalaze planinarski dom „Josip Pasarić” i vidikovci s kojih se pruža pogled na Zagorje, Varaždin, Međimurje, a za vedrih dana i prema Alpama.	Vrh Ivanščice / planinarski dom Josip Pasarić	Ivanec	Varaždinska	0.00	2026-08-17 16:42:08.296	46.181400	16.127200	150	70	2	6	f	1	5
14	Dinara	Dinara je planina na granici Hrvatske i Bosne i Hercegovine, a njezin vrh Sinjal (Dinara) sa 1831 m nadmorske visine najviši je vrh Hrvatske. Područje je poznato po krškom reljefu, prostranim planinskim livadama i atraktivnim planinarskim stazama.	Vrh Dinare / Sinjal	Knin	Šibensko-kninska	0.00	2026-08-17 16:44:34.023	44.062800	16.381400	200	100	2	6	f	1	1
1	Dvorac Trakošćan	Dvorac Trakošćan jedan je od najpoznatijih i najromantičnijih dvoraca u Hrvatskoj. Smješten je u Hrvatskom zagorju, okružen šumom, brežuljcima i jezerom koje dodatno naglašava njegov bajkovit izgled. Današnji izgled dvorac je dobio u\n  19. stoljeću, kada je obnovljen u neogotičkom stilu, dok njegovi počeci sežu još u srednji vijek. Zbog očuvane arhitekture, bogate povijesti i slikovitog krajolika, Trakošćan je jedna od najprepoznatljivijih kulturno-povijesnih lokacija u Hrvatskoj.\n\n  Unutrašnjost dvorca uređena je kao muzej te prikazuje način života plemićke obitelji Drašković, koja je stoljećima bila povezana s ovim prostorom. Posjetitelji mogu razgledati zbirke oružja, namještaja, portreta i drugih povijesnih predmeta, dok\n  šetnica oko jezera pruža miran doživljaj prirode i pogled na dvorac iz različitih perspektiva. Trakošćan je zato idealna lokacija za istraživanje hrvatske povijesti, arhitekture i prirodnih ljepota u jednom posjetu.	Trakošćan 4, Bednja	Bednja	Varaždinska	10.50	2026-07-09 17:57:13.458	46.257000	15.948000	120	50	2	1	f	6	4.166666666666667
\.


--
-- TOC entry 4969 (class 0 OID 17362)
-- Dependencies: 231
-- Data for Name: nacin_otkljucavanja; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nacin_otkljucavanja (nacin_otkljucavanja_id, naziv) FROM stdin;
2	Kupnja
3	Postignuće
4	Izazov
5	Razina
6	Zadano
\.


--
-- TOC entry 4975 (class 0 OID 17387)
-- Dependencies: 237
-- Data for Name: postignuce; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.postignuce (postignuce_id, naziv, opis, broj_potrebnih_lokacija, nagrada_xp, nagrada_valuta, kategorija_id, dekoracija_id) FROM stdin;
3	Ljubitelj kulture	Riješi 3 izazova s kategorijom muzeji	3	50	20	3	8
2	Lovac na vrhove	Riješi 3 planinske lokacije	3	50	20	6	9
4	Osvajac dvoraca	Riješi 3 izazova s kategorijom dvorac	3	50	20	1	7
5	Ljubitelj prirode	Riješi 5 izazova s kategorijom nacionalni park	5	100	60	2	15
6	Ljubitelj mora	Riješi 2 izazova s kategorijom plaza	2	45	20	4	16
7	Ljubitelj pogleda	Riješi 3 lokacije s kategorijom vidikovac	3	55	35	5	17
\.


--
-- TOC entry 4979 (class 0 OID 17404)
-- Dependencies: 241
-- Data for Name: povratna_informacija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.povratna_informacija (povratna_informacija_id, tekst, ocjena, datum, korisnik_id, lokacija_id) FROM stdin;
1	Prekrasna lokacija, sve je uredno i dobro označeno. Svakako preporučujem posjet.	5	2026-08-04 19:58:47.772	1	1
2	Odlično mjesto za izlet. Pogled je prekrasan, a pristup lokaciji je jednostavan.	5	2026-08-04 19:58:47.772	1	1
3	Vrlo zanimljiva lokacija s puno sadržaja za razgledavanje. Rado bih ponovno došao.	5	2026-08-04 19:58:47.772	1	1
4	Lijepa lokacija i ugodno iskustvo, ali bi moglo biti više informativnih oznaka.	4	2026-08-04 19:58:47.772	1	1
5	Lokacija je zanimljiva, ali pristup nije najbolje označen i nedostaje dodatnih sadržaja.	3	2026-08-04 19:58:47.772	1	1
13	asdasdasdasdasd	3	2026-08-08 13:28:21.926	2	1
15	stavro dobro	5	2026-08-20 15:20:20.664	3	13
16	asdakjdnaskjdnaskjndad	1	2026-08-20 17:12:19.871	2	14
17	ok je asdasdasd	3	2026-09-01 15:39:03.624	2	7
18	asdasdasdadaasdasdas	4	2026-09-01 15:39:07.843	2	7
19	asdasdasdasdasdasdasd	4	2026-09-01 15:39:20.36	2	6
20	Pogled je stvarno nevjerojatan! Skywalk je posebno iskustvo, a za vedrog vremena vidi se jako daleko. Definitivno vrijedi posjetiti ako ste na Biokovu	5	2026-09-01 15:40:06.938	2	5
21	Prekrasna lokacija i odličan pogled, pogotovo sa staklene platforme. Jedina zamjerka je gužva tijekom sezone, ali svejedno bih preporučio posjet	4	2026-09-01 15:40:11.62	2	5
22	Vrlo zanimljiv i drugačiji muzej. Priče uz izložene predmete su istovremeno emotivne, tužne i zabavne	5	2026-09-01 15:40:59.221	2	3
23	Neobična ideja koja je jako dobro izvedena. Neke priče su mi ostale u sjećanju i nakon posjeta	4	2026-09-01 15:41:04.021	2	3
24	Mali, ali stvarno poseban muzej. Preporučujem ga svima koji žele vidjeti nešto drugačije od klasičnih muzeja	5	2026-09-01 15:41:07.66	2	3
\.


--
-- TOC entry 4959 (class 0 OID 17289)
-- Dependencies: 221
-- Data for Name: profil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profil (profil_id, opis_profila, razina, xp_bodovi, virtualni_novac, korisnik_id, profilna_slika_url) FROM stdin;
3	\N	2	60	120	3	\N
1	Volim putovati po Hrvatskoj.	2	50	45	1	\N
2	Ljubitelj putovanja, prirode i otkrivanja skrivenih kutaka Hrvatske. Slobodno vrijeme najradije provodim istražujući nova mjesta, planinarske staze, dvorce i sl.\n	14	27	1150	2	\N
\.


--
-- TOC entry 4965 (class 0 OID 17333)
-- Dependencies: 227
-- Data for Name: rijesena_lokacija; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rijesena_lokacija (rijesena_lokacija_id, datum_vrijeme_posjeta, biljeska, broj_osvojenih_xp, broj_osvojene_valute, korisnik_id, lokacija_id) FROM stdin;
1	2026-07-11 13:56:32.178	\N	40	10	1	6
2	2026-07-11 13:57:07.88	\N	60	15	1	7
3	2026-08-05 16:36:54.018	\N	120	40	2	1
7	2026-08-10 17:44:09.376	ovo je bilo bas super	40	10	2	6
8	2026-08-12 15:56:03.06	basss dobrooo 	150	50	2	5
9	2026-08-17 15:27:44.618	asd	60	15	2	7
10	2026-08-17 15:48:49.253		90	30	2	3
11	2026-08-20 15:20:06.506	ovo je bilo stvarno super	150	70	3	13
12	2026-08-20 17:11:56.574	asjdnaskdjasdasd	200	100	2	14
\.


--
-- TOC entry 4981 (class 0 OID 18015)
-- Dependencies: 243
-- Data for Name: slika_lokacije; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slika_lokacije (slika_id, putanja_slike, opis_slike, datum_dodavanja, glavna, lokacija_id) FROM stdin;
2	/prijenos/lokacije/vidikovac-biokovo-1.jpg	Vidikovac Biokovo	2026-07-22 17:07:16.647	t	5
3	/prijenos/lokacije/sljeme-1.jpg	Sljeme	2026-07-22 17:07:39.023	t	6
4	/prijenos/lokacije/np-risnjak-1.jpg	Nacionalni park Risnjak	2026-07-22 17:07:55.131	t	7
30	/prijenos/lokacije/1786984404471-482345684.jpg		2026-08-17 16:33:24.476	f	4
27	/prijenos/lokacije/1786984396974-114331041.jpeg		2026-08-17 16:33:16.98	t	4
31	/prijenos/lokacije/1786984589549-961710018.jpg		2026-08-17 16:36:29.554	f	3
33	/prijenos/lokacije/1786984595511-245343607.jpg		2026-08-17 16:36:35.516	f	3
34	/prijenos/lokacije/1786984597919-50133424.webp		2026-08-17 16:36:37.923	f	3
32	/prijenos/lokacije/1786984593320-569609655.jpg		2026-08-17 16:36:33.325	t	3
36	/prijenos/lokacije/1786984703297-531024432.jpg		2026-08-17 16:38:23.301	f	2
37	/prijenos/lokacije/1786984706179-790508754.jpg		2026-08-17 16:38:26.183	f	2
38	/prijenos/lokacije/1786984708507-40986810.jpeg		2026-08-17 16:38:28.515	f	2
35	/prijenos/lokacije/1786984700788-251323992.jpg		2026-08-17 16:38:20.791	t	2
39	/prijenos/lokacije/1786984934237-124578272.jpg		2026-08-17 16:42:14.247	f	13
40	/prijenos/lokacije/1786984936584-24685998.jpg		2026-08-17 16:42:16.593	f	13
9	/prijenos/lokacije/dvorac-trakoscan-5.jpg	Dvorac Trakošćan 5	2026-07-29 19:46:13.285	f	1
41	/prijenos/lokacije/1786984938845-243210811.webp		2026-08-17 16:42:18.851	f	13
8	/prijenos/lokacije/dvorac-trakoscan-4.jpg	Dvorac Trakošćan 4	2026-07-29 19:46:13.285	f	1
42	/prijenos/lokacije/1786984941135-64080257.jpg		2026-08-17 16:42:21.14	t	13
43	/prijenos/lokacije/1786985079432-540618615.jpg		2026-08-17 16:44:39.437	f	14
7	/prijenos/lokacije/dvorac-trakoscan-3.jpg	Dvorac Trakošćan 3	2026-07-29 19:46:13.285	f	1
45	/prijenos/lokacije/1786985083785-15087814.jpg		2026-08-17 16:44:43.791	f	14
46	/prijenos/lokacije/1786985085912-761290138.jpg		2026-08-17 16:44:45.917	f	14
6	/prijenos/lokacije/dvorac-trakoscan-2.jpg	Dvorac Trakošćan 2	2026-07-29 19:46:13.285	f	1
44	/prijenos/lokacije/1786985081700-294680931.jpg		2026-08-17 16:44:41.724	t	14
5	/prijenos/lokacije/dvorac-trakoscan-1.jpg	Dvorac Trakošćan 1	2026-07-29 19:46:13.285	t	1
17	/prijenos/lokacije/1786983800226-444953735.jpg		2026-08-17 16:23:20.235	f	7
18	/prijenos/lokacije/1786983821257-713875604.jpg		2026-08-17 16:23:41.263	f	7
19	/prijenos/lokacije/1786983826045-85004309.jpg		2026-08-17 16:23:46.052	f	7
20	/prijenos/lokacije/1786984115175-309854141.jpg		2026-08-17 16:28:35.231	f	6
21	/prijenos/lokacije/1786984118241-4214210.jpg		2026-08-17 16:28:38.248	f	6
22	/prijenos/lokacije/1786984120966-725888844.jpg		2026-08-17 16:28:40.971	f	6
23	/prijenos/lokacije/1786984123408-21744816.jpg		2026-08-17 16:28:43.412	f	6
24	/prijenos/lokacije/1786984268868-634569778.jpeg		2026-08-17 16:31:08.872	f	5
25	/prijenos/lokacije/1786984271406-828932578.jpg		2026-08-17 16:31:11.412	f	5
26	/prijenos/lokacije/1786984273738-506201502.jpg		2026-08-17 16:31:13.745	f	5
28	/prijenos/lokacije/1786984399616-443695298.jpg		2026-08-17 16:33:19.62	f	4
29	/prijenos/lokacije/1786984401975-831245270.jpg		2026-08-17 16:33:21.981	f	4
\.


--
-- TOC entry 4983 (class 0 OID 18026)
-- Dependencies: 245
-- Data for Name: slika_posjeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.slika_posjeta (slika_id, putanja_slike, opis_slike, datum_dodavanja, rijesena_lokacija_id) FROM stdin;
4	/prijenos/posjeti/1786383849368-191971708.png	\N	2026-08-10 17:44:09.376	7
5	/prijenos/posjeti/1786383849370-978245468.png	\N	2026-08-10 17:44:09.376	7
6	/prijenos/posjeti/1786550163039-991412933.png	\N	2026-08-12 15:56:03.06	8
7	/prijenos/posjeti/1786550163042-810012684.png	\N	2026-08-12 15:56:03.06	8
8	/prijenos/posjeti/1786550163047-632209608.png	\N	2026-08-12 15:56:03.06	8
9	/prijenos/posjeti/1786550163052-393959169.png	\N	2026-08-12 15:56:03.06	8
10	/prijenos/posjeti/1786550163053-49231981.png	\N	2026-08-12 15:56:03.06	8
11	/prijenos/posjeti/1787239206496-991620952.png	\N	2026-08-20 15:20:06.506	11
12	/prijenos/posjeti/1787245916559-989845167.png	\N	2026-08-20 17:11:56.574	12
13	/prijenos/posjeti/1787245916562-94039134.png	\N	2026-08-20 17:11:56.574	12
\.


--
-- TOC entry 4967 (class 0 OID 17355)
-- Dependencies: 229
-- Data for Name: tip_dekoracije; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tip_dekoracije (tip_dekoracije_id, naziv, max_aktivnih) FROM stdin;
2	bedz	3
1	avatar	1
3	pozadina	1
\.


--
-- TOC entry 4955 (class 0 OID 17271)
-- Dependencies: 217
-- Data for Name: uloga; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.uloga (uloga_id, naziv, opis) FROM stdin;
1	korisnik	Osnovna korisnička uloga
2	admin	Administrator sustava
\.


--
-- TOC entry 5004 (class 0 OID 0)
-- Dependencies: 232
-- Name: dekoracija_dekoracija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dekoracija_dekoracija_id_seq', 17, true);


--
-- TOC entry 5005 (class 0 OID 0)
-- Dependencies: 222
-- Name: kategorija_lokacije_kategorija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.kategorija_lokacije_kategorija_id_seq', 6, true);


--
-- TOC entry 5006 (class 0 OID 0)
-- Dependencies: 234
-- Name: korisnik_dekoracija_korisnik_dekoracija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_dekoracija_korisnik_dekoracija_id_seq', 9, true);


--
-- TOC entry 5007 (class 0 OID 0)
-- Dependencies: 218
-- Name: korisnik_korisnik_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_korisnik_id_seq', 3, true);


--
-- TOC entry 5008 (class 0 OID 0)
-- Dependencies: 238
-- Name: korisnik_postignuce_korisnik_postignuce_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.korisnik_postignuce_korisnik_postignuce_id_seq', 2, true);


--
-- TOC entry 5009 (class 0 OID 0)
-- Dependencies: 224
-- Name: lokacija_lokacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lokacija_lokacija_id_seq', 15, true);


--
-- TOC entry 5010 (class 0 OID 0)
-- Dependencies: 230
-- Name: nacin_otkljucavanja_nacin_otkljucavanja_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nacin_otkljucavanja_nacin_otkljucavanja_id_seq', 6, true);


--
-- TOC entry 5011 (class 0 OID 0)
-- Dependencies: 236
-- Name: postignuce_postignuce_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.postignuce_postignuce_id_seq', 7, true);


--
-- TOC entry 5012 (class 0 OID 0)
-- Dependencies: 240
-- Name: povratna_informacija_povratna_informacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.povratna_informacija_povratna_informacija_id_seq', 24, true);


--
-- TOC entry 5013 (class 0 OID 0)
-- Dependencies: 220
-- Name: profil_profil_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profil_profil_id_seq', 3, true);


--
-- TOC entry 5014 (class 0 OID 0)
-- Dependencies: 226
-- Name: rijesena_lokacija_rijesena_lokacija_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rijesena_lokacija_rijesena_lokacija_id_seq', 12, true);


--
-- TOC entry 5015 (class 0 OID 0)
-- Dependencies: 242
-- Name: slika_lokacije_slika_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slika_lokacije_slika_id_seq', 47, true);


--
-- TOC entry 5016 (class 0 OID 0)
-- Dependencies: 244
-- Name: slika_posjeta_slika_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.slika_posjeta_slika_id_seq', 13, true);


--
-- TOC entry 5017 (class 0 OID 0)
-- Dependencies: 228
-- Name: tip_dekoracije_tip_dekoracije_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tip_dekoracije_tip_dekoracije_id_seq', 3, true);


--
-- TOC entry 5018 (class 0 OID 0)
-- Dependencies: 216
-- Name: uloga_uloga_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.uloga_uloga_id_seq', 2, true);


--
-- TOC entry 4747 (class 2606 OID 17269)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4774 (class 2606 OID 17376)
-- Name: dekoracija dekoracija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dekoracija
    ADD CONSTRAINT dekoracija_pkey PRIMARY KEY (dekoracija_id);


--
-- TOC entry 4760 (class 2606 OID 17308)
-- Name: kategorija_lokacije kategorija_lokacije_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.kategorija_lokacije
    ADD CONSTRAINT kategorija_lokacije_pkey PRIMARY KEY (kategorija_id);


--
-- TOC entry 4777 (class 2606 OID 17385)
-- Name: korisnik_dekoracija korisnik_dekoracija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_dekoracija
    ADD CONSTRAINT korisnik_dekoracija_pkey PRIMARY KEY (korisnik_dekoracija_id);


--
-- TOC entry 4754 (class 2606 OID 17287)
-- Name: korisnik korisnik_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik
    ADD CONSTRAINT korisnik_pkey PRIMARY KEY (korisnik_id);


--
-- TOC entry 4783 (class 2606 OID 17402)
-- Name: korisnik_postignuce korisnik_postignuce_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_postignuce
    ADD CONSTRAINT korisnik_postignuce_pkey PRIMARY KEY (korisnik_postignuce_id);


--
-- TOC entry 4762 (class 2606 OID 17320)
-- Name: lokacija lokacija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija
    ADD CONSTRAINT lokacija_pkey PRIMARY KEY (lokacija_id);


--
-- TOC entry 4771 (class 2606 OID 17367)
-- Name: nacin_otkljucavanja nacin_otkljucavanja_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nacin_otkljucavanja
    ADD CONSTRAINT nacin_otkljucavanja_pkey PRIMARY KEY (nacin_otkljucavanja_id);


--
-- TOC entry 4780 (class 2606 OID 17394)
-- Name: postignuce postignuce_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postignuce
    ADD CONSTRAINT postignuce_pkey PRIMARY KEY (postignuce_id);


--
-- TOC entry 4785 (class 2606 OID 17412)
-- Name: povratna_informacija povratna_informacija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.povratna_informacija
    ADD CONSTRAINT povratna_informacija_pkey PRIMARY KEY (povratna_informacija_id);


--
-- TOC entry 4757 (class 2606 OID 17299)
-- Name: profil profil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil
    ADD CONSTRAINT profil_pkey PRIMARY KEY (profil_id);


--
-- TOC entry 4765 (class 2606 OID 17343)
-- Name: rijesena_lokacija rijesena_lokacija_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rijesena_lokacija
    ADD CONSTRAINT rijesena_lokacija_pkey PRIMARY KEY (rijesena_lokacija_id);


--
-- TOC entry 4787 (class 2606 OID 18024)
-- Name: slika_lokacije slika_lokacije_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_lokacije
    ADD CONSTRAINT slika_lokacije_pkey PRIMARY KEY (slika_id);


--
-- TOC entry 4790 (class 2606 OID 18034)
-- Name: slika_posjeta slika_posjeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_posjeta
    ADD CONSTRAINT slika_posjeta_pkey PRIMARY KEY (slika_id);


--
-- TOC entry 4768 (class 2606 OID 17360)
-- Name: tip_dekoracije tip_dekoracije_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tip_dekoracije
    ADD CONSTRAINT tip_dekoracije_pkey PRIMARY KEY (tip_dekoracije_id);


--
-- TOC entry 4750 (class 2606 OID 17278)
-- Name: uloga uloga_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.uloga
    ADD CONSTRAINT uloga_pkey PRIMARY KEY (uloga_id);


--
-- TOC entry 4772 (class 1259 OID 17423)
-- Name: dekoracija_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX dekoracija_naziv_key ON public.dekoracija USING btree (naziv);


--
-- TOC entry 4758 (class 1259 OID 17417)
-- Name: kategorija_lokacije_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX kategorija_lokacije_naziv_key ON public.kategorija_lokacije USING btree (naziv);


--
-- TOC entry 4775 (class 1259 OID 17424)
-- Name: korisnik_dekoracija_korisnik_id_dekoracija_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX korisnik_dekoracija_korisnik_id_dekoracija_id_key ON public.korisnik_dekoracija USING btree (korisnik_id, dekoracija_id);


--
-- TOC entry 4751 (class 1259 OID 17415)
-- Name: korisnik_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX korisnik_email_key ON public.korisnik USING btree (email);


--
-- TOC entry 4752 (class 1259 OID 17414)
-- Name: korisnik_korisnicko_ime_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX korisnik_korisnicko_ime_key ON public.korisnik USING btree (korisnicko_ime);


--
-- TOC entry 4781 (class 1259 OID 17426)
-- Name: korisnik_postignuce_korisnik_id_postignuce_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX korisnik_postignuce_korisnik_id_postignuce_id_key ON public.korisnik_postignuce USING btree (korisnik_id, postignuce_id);


--
-- TOC entry 4769 (class 1259 OID 17422)
-- Name: nacin_otkljucavanja_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nacin_otkljucavanja_naziv_key ON public.nacin_otkljucavanja USING btree (naziv);


--
-- TOC entry 4778 (class 1259 OID 17425)
-- Name: postignuce_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX postignuce_naziv_key ON public.postignuce USING btree (naziv);


--
-- TOC entry 4755 (class 1259 OID 17416)
-- Name: profil_korisnik_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX profil_korisnik_id_key ON public.profil USING btree (korisnik_id);


--
-- TOC entry 4763 (class 1259 OID 17419)
-- Name: rijesena_lokacija_korisnik_id_lokacija_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX rijesena_lokacija_korisnik_id_lokacija_id_key ON public.rijesena_lokacija USING btree (korisnik_id, lokacija_id);


--
-- TOC entry 4788 (class 1259 OID 18035)
-- Name: slika_lokacije_putanja_slike_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX slika_lokacije_putanja_slike_key ON public.slika_lokacije USING btree (putanja_slike);


--
-- TOC entry 4791 (class 1259 OID 18036)
-- Name: slika_posjeta_putanja_slike_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX slika_posjeta_putanja_slike_key ON public.slika_posjeta USING btree (putanja_slike);


--
-- TOC entry 4766 (class 1259 OID 17421)
-- Name: tip_dekoracije_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX tip_dekoracije_naziv_key ON public.tip_dekoracije USING btree (naziv);


--
-- TOC entry 4748 (class 1259 OID 17413)
-- Name: uloga_naziv_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX uloga_naziv_key ON public.uloga USING btree (naziv);


--
-- TOC entry 4798 (class 2606 OID 17472)
-- Name: dekoracija dekoracija_nacin_otkljucavanja_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dekoracija
    ADD CONSTRAINT dekoracija_nacin_otkljucavanja_id_fkey FOREIGN KEY (nacin_otkljucavanja_id) REFERENCES public.nacin_otkljucavanja(nacin_otkljucavanja_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4799 (class 2606 OID 17467)
-- Name: dekoracija dekoracija_tip_dekoracije_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dekoracija
    ADD CONSTRAINT dekoracija_tip_dekoracije_id_fkey FOREIGN KEY (tip_dekoracije_id) REFERENCES public.tip_dekoracije(tip_dekoracije_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4800 (class 2606 OID 19196)
-- Name: korisnik_dekoracija korisnik_dekoracija_dekoracija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_dekoracija
    ADD CONSTRAINT korisnik_dekoracija_dekoracija_id_fkey FOREIGN KEY (dekoracija_id) REFERENCES public.dekoracija(dekoracija_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4801 (class 2606 OID 19201)
-- Name: korisnik_dekoracija korisnik_dekoracija_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_dekoracija
    ADD CONSTRAINT korisnik_dekoracija_korisnik_id_fkey FOREIGN KEY (korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4804 (class 2606 OID 19216)
-- Name: korisnik_postignuce korisnik_postignuce_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_postignuce
    ADD CONSTRAINT korisnik_postignuce_korisnik_id_fkey FOREIGN KEY (korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4805 (class 2606 OID 19211)
-- Name: korisnik_postignuce korisnik_postignuce_postignuce_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik_postignuce
    ADD CONSTRAINT korisnik_postignuce_postignuce_id_fkey FOREIGN KEY (postignuce_id) REFERENCES public.postignuce(postignuce_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4792 (class 2606 OID 17427)
-- Name: korisnik korisnik_uloga_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.korisnik
    ADD CONSTRAINT korisnik_uloga_id_fkey FOREIGN KEY (uloga_id) REFERENCES public.uloga(uloga_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4794 (class 2606 OID 17437)
-- Name: lokacija lokacija_dodao_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija
    ADD CONSTRAINT lokacija_dodao_korisnik_id_fkey FOREIGN KEY (dodao_korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4795 (class 2606 OID 17442)
-- Name: lokacija lokacija_kategorija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lokacija
    ADD CONSTRAINT lokacija_kategorija_id_fkey FOREIGN KEY (kategorija_id) REFERENCES public.kategorija_lokacije(kategorija_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4802 (class 2606 OID 19206)
-- Name: postignuce postignuce_dekoracija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postignuce
    ADD CONSTRAINT postignuce_dekoracija_id_fkey FOREIGN KEY (dekoracija_id) REFERENCES public.dekoracija(dekoracija_id) ON UPDATE SET NULL ON DELETE SET NULL;


--
-- TOC entry 4803 (class 2606 OID 17487)
-- Name: postignuce postignuce_kategorija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postignuce
    ADD CONSTRAINT postignuce_kategorija_id_fkey FOREIGN KEY (kategorija_id) REFERENCES public.kategorija_lokacije(kategorija_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4806 (class 2606 OID 19221)
-- Name: povratna_informacija povratna_informacija_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.povratna_informacija
    ADD CONSTRAINT povratna_informacija_korisnik_id_fkey FOREIGN KEY (korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4807 (class 2606 OID 19226)
-- Name: povratna_informacija povratna_informacija_lokacija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.povratna_informacija
    ADD CONSTRAINT povratna_informacija_lokacija_id_fkey FOREIGN KEY (lokacija_id) REFERENCES public.lokacija(lokacija_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4793 (class 2606 OID 19171)
-- Name: profil profil_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profil
    ADD CONSTRAINT profil_korisnik_id_fkey FOREIGN KEY (korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4796 (class 2606 OID 19181)
-- Name: rijesena_lokacija rijesena_lokacija_korisnik_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rijesena_lokacija
    ADD CONSTRAINT rijesena_lokacija_korisnik_id_fkey FOREIGN KEY (korisnik_id) REFERENCES public.korisnik(korisnik_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4797 (class 2606 OID 19186)
-- Name: rijesena_lokacija rijesena_lokacija_lokacija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rijesena_lokacija
    ADD CONSTRAINT rijesena_lokacija_lokacija_id_fkey FOREIGN KEY (lokacija_id) REFERENCES public.lokacija(lokacija_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 19176)
-- Name: slika_lokacije slika_lokacije_lokacija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_lokacije
    ADD CONSTRAINT slika_lokacije_lokacija_id_fkey FOREIGN KEY (lokacija_id) REFERENCES public.lokacija(lokacija_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4809 (class 2606 OID 19191)
-- Name: slika_posjeta slika_posjeta_rijesena_lokacija_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.slika_posjeta
    ADD CONSTRAINT slika_posjeta_rijesena_lokacija_id_fkey FOREIGN KEY (rijesena_lokacija_id) REFERENCES public.rijesena_lokacija(rijesena_lokacija_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2026-09-01 17:54:08

--
-- PostgreSQL database dump complete
--

