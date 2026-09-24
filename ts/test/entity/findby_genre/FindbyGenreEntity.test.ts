

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


describe('FindbyGenreEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.FindbyGenre()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'findby_genre.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"currentPage":{"a":true,"h":"Current Page","n":"currentPage","r":false,"sh":"Current page number","t":"`$INTEGER`","key$":"currentPage","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"wholePage":{"a":true,"h":"Whole Page","n":"wholePage","r":false,"sh":"Array of anime on current page","t":"`$ARRAY`","key$":"wholePage","index$":2}},"id":{"field":"id","name":"id"},"name":"findby_genre","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/findbyGenre/{genre}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"harem","k":"param","n":"id","or":"genre","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/findbyGenre/{genre}","q":{"exist":["id","page"]},"r":{"param":{"genre":"id"}},"s":[{"lit":"api"},{"lit":"findbyGenre"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"findby_genre","name__orig":"findby_genre","Name":"FindbyGenre","name_":"findby_genre","name-":"findby-genre","NAME":"FINDBY_GENRE","index$":2}, {"active":true,"entity":"findby_genre","key$":"BasicFindbyGenreFlow","kind":"basic","name":"BasicFindbyGenreFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"findby_genre_ref01","srcdatavar":"findby_genre_ref01_data","suffix":"_dt0"},"m":{"id":"findby_genre01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-findby_genre_ref01"}}],"index$":0}]}, 'FindbyGenre', {"GET /api/findbyGenre/{genre}":{"protocol":"http","operationId":"findByGenre","responses":{"200":{"description":"Paginated list of anime by genre","content":{"application/json":{"schema":{"type":"object","properties":{"currentPage":{"description":"Current page number","key$":"currentPage","type":"integer"},"wholePage":{"description":"Array of anime on current page","items":{"properties":{"Aired":{"description":"Air date range","type":"string","key$":"Aired"},"Cover":{"description":"Cover image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"Cover"},"DescripTion":{"description":"Anime description","type":"string","key$":"DescripTion"},"Duration":{"description":"Episode duration","type":"string","key$":"Duration"},"Genres":{"description":"List of genres","items":{"type":"string"},"type":"array","key$":"Genres"},"ImagePath":{"description":"Image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"ImagePath"},"MALScore":{"description":"MyAnimeList score","type":"string","key$":"MALScore"},"Name":{"description":"Anime name","type":"string","key$":"Name"},"Premiered":{"description":"Premiere season","type":"string","key$":"Premiered"},"RatingsNum":{"description":"Number of ratings","type":"integer","key$":"RatingsNum"},"Status":{"description":"Airing status","type":"string","key$":"Status"},"Studios":{"description":"Production studio","type":"string","key$":"Studios"},"Synonyms":{"description":"Alternative names","type":"string","key$":"Synonyms"},"_id":{"description":"Anime ID","type":"integer","key$":"_id"},"epCount":{"description":"Episode count","type":"integer","key$":"epCount"},"finder":{"description":"Slug identifier","type":"string","key$":"finder"}},"type":"object","x-ref":"#/components/schemas/AnimeInfo","index$":0},"key$":"wholePage","type":"array"}},"x-ref":"#/components/schemas/PaginatedAnimeList","index$":0}}}},"400":{"description":"Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"genre","in":"path","required":true,"description":"Genre name (e.g., harem, action, romance)","schema":{"type":"string"},"example":"harem","index$":0},{"name":"Page","in":"query","required":false,"description":"Page number, default 1","schema":{"type":"integer","default":1},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let findby_genre_ref01_data = Object.values(setup.data.existing.findby_genre)[0] as any

    // LOAD
    const findby_genre_ref01_ent = client.FindbyGenre()
    const findby_genre_ref01_match_dt0: any = {}
    findby_genre_ref01_match_dt0.id = findby_genre_ref01_data.id
    const findby_genre_ref01_data_dt0 = (await findby_genre_ref01_ent.load(findby_genre_ref01_match_dt0)).data()
    assert(findby_genre_ref01_data_dt0.id === findby_genre_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/findby_genre/FindbyGenreTestData.json')

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
    ['findby_genre01','findby_genre02','findby_genre03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_FINDBY_GENRE_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_FINDBY_GENRE_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_FINDBY_GENRE_ENTID']
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
  
