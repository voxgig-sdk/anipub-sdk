

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { AnipubSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('FullAnimeDetailEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.FullAnimeDetail()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'full_anime_detail.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"characters":{"a":true,"h":"Characters","n":"characters","r":false,"t":"`$ARRAY`","key$":"characters","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"jikan":{"a":true,"h":"Jikan","n":"jikan","r":false,"sh":"MyAnimeList data from Jikan API","t":"`$OBJECT`","key$":"jikan","index$":2},"local":{"a":true,"h":"Local","n":"local","r":false,"t":"`$OBJECT`","key$":"local","index$":3}},"id":{"field":"id","name":"id"},"name":"full_anime_detail","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /anime/api/details/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":119,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/anime/api/details/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"anime"},{"lit":"api"},{"lit":"details"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"full_anime_detail","name__orig":"full_anime_detail","Name":"FullAnimeDetail","name_":"full_anime_detail","name-":"full-anime-detail","NAME":"FULL_ANIME_DETAIL","index$":3}, {"active":true,"entity":"full_anime_detail","key$":"BasicFullAnimeDetailFlow","kind":"basic","name":"BasicFullAnimeDetailFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"full_anime_detail_ref01","srcdatavar":"full_anime_detail_ref01_data","suffix":"_dt0"},"m":{"id":"full_anime_detail01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-full_anime_detail_ref01"}}],"index$":0}]}, 'FullAnimeDetail', {"GET /anime/api/details/{id}":{"protocol":"http","operationId":"getFullDetails","responses":{"200":{"description":"Full anime details including MAL data and characters","content":{"application/json":{"schema":{"type":"object","properties":{"local":{"type":"object","properties":{"_id":{"description":"Anime ID","type":"integer","key$":"_id"},"Name":{"description":"Anime name","type":"string","key$":"Name"},"ImagePath":{"description":"Image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"ImagePath"},"Cover":{"description":"Cover image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"Cover"},"Synonyms":{"description":"Alternative names","type":"string","key$":"Synonyms"},"Aired":{"description":"Air date range","type":"string","key$":"Aired"},"Premiered":{"description":"Premiere season","type":"string","key$":"Premiered"},"RatingsNum":{"description":"Number of ratings","type":"integer","key$":"RatingsNum"},"Genres":{"description":"List of genres","items":{"type":"string"},"type":"array","key$":"Genres"},"Studios":{"description":"Production studio","type":"string","key$":"Studios"},"DescripTion":{"description":"Anime description","type":"string","key$":"DescripTion"},"Duration":{"description":"Episode duration","type":"string","key$":"Duration"},"MALScore":{"description":"MyAnimeList score","type":"string","key$":"MALScore"},"Status":{"description":"Airing status","type":"string","key$":"Status"},"epCount":{"description":"Episode count","type":"integer","key$":"epCount"},"finder":{"description":"Slug identifier","type":"string","key$":"finder"}},"x-ref":"#/components/schemas/AnimeInfo","key$":"local"},"jikan":{"type":"object","description":"MyAnimeList data from Jikan API","properties":{"synopsis":{"type":"string"},"score":{"type":"number"},"scored_by":{"type":"integer"},"rank":{"type":"integer"},"popularity":{"type":"integer"}},"key$":"jikan"},"characters":{"type":"array","items":{"type":"object","properties":{"character":{"type":"object","properties":{"name":{"type":"string"},"image_url":{"type":"string"}}},"role":{"type":"string","description":"Character role (e.g., Main, Supporting)"},"voice_actors":{"type":"array","items":{"type":"object","properties":{"person":{"type":"object","properties":{"name":{"type":"string"},"image_url":{"type":"string"}}},"language":{"type":"string"}}}}},"x-ref":"#/components/schemas/Character"},"key$":"characters"}},"x-ref":"#/components/schemas/FullAnimeDetails","index$":0}}}},"404":{"description":"Anime not found","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Anime ID","schema":{"type":"integer"},"example":119,"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let full_anime_detail_ref01_data = Object.values(setup.data.existing.full_anime_detail)[0] as any

    // LOAD
    const full_anime_detail_ref01_ent = client.FullAnimeDetail()
    const full_anime_detail_ref01_match_dt0: any = {}
    full_anime_detail_ref01_match_dt0.id = full_anime_detail_ref01_data.id
    const full_anime_detail_ref01_data_dt0 = (await full_anime_detail_ref01_ent.load(full_anime_detail_ref01_match_dt0)).data()
    assert(full_anime_detail_ref01_data_dt0.id === full_anime_detail_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/full_anime_detail/FullAnimeDetailTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = AnipubSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['full_anime_detail01','full_anime_detail02','full_anime_detail03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_FULL_ANIME_DETAIL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new AnipubSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ANIPUB_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
