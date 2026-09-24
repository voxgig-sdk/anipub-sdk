

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


describe('RatingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Rating()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rating.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Aired":{"a":true,"h":"Aired","n":"Aired","r":false,"sh":"Air date range","t":"`$STRING`","key$":"Aired","index$":0},"Cover":{"a":true,"h":"Cover","n":"Cover","r":false,"sh":"Cover image path or URL.","t":"`$STRING`","key$":"Cover","index$":1},"DescripTion":{"a":true,"h":"Descrip Tion","n":"DescripTion","r":false,"sh":"Anime description","t":"`$STRING`","key$":"DescripTion","index$":2},"Duration":{"a":true,"h":"Duration","n":"Duration","r":false,"sh":"Episode duration","t":"`$STRING`","key$":"Duration","index$":3},"Genres":{"a":true,"h":"Genres","n":"Genres","r":false,"sh":"List of genres","t":"`$ARRAY`","key$":"Genres","index$":4},"ImagePath":{"a":true,"h":"Image Path","n":"ImagePath","r":false,"sh":"Image path or URL.","t":"`$STRING`","key$":"ImagePath","index$":5},"MALScore":{"a":true,"h":"Mal Score","n":"MALScore","r":false,"sh":"MyAnimeList score","t":"`$STRING`","key$":"MALScore","index$":6},"Name":{"a":true,"h":"Name","n":"Name","r":false,"sh":"Anime name","t":"`$STRING`","key$":"Name","index$":7},"Premiered":{"a":true,"h":"Premiered","n":"Premiered","r":false,"sh":"Premiere season","t":"`$STRING`","key$":"Premiered","index$":8},"RatingsNum":{"a":true,"h":"Ratings Num","n":"RatingsNum","r":false,"sh":"Number of ratings","t":"`$INTEGER`","key$":"RatingsNum","index$":9},"Status":{"a":true,"h":"Status","n":"Status","r":false,"sh":"Airing status","t":"`$STRING`","key$":"Status","index$":10},"Studios":{"a":true,"h":"Studios","n":"Studios","r":false,"sh":"Production studio","t":"`$STRING`","key$":"Studios","index$":11},"Synonyms":{"a":true,"h":"Synonyms","n":"Synonyms","r":false,"sh":"Alternative names","t":"`$STRING`","key$":"Synonyms","index$":12},"epCount":{"a":true,"h":"Ep Count","n":"epCount","r":false,"sh":"Episode count","t":"`$INTEGER`","key$":"epCount","index$":13},"finder":{"a":true,"h":"Finder","n":"finder","r":false,"sh":"Slug identifier","t":"`$STRING`","key$":"finder","index$":14},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Anime ID","t":"`$INTEGER`","key$":"id","index$":15}},"id":{"field":"id","name":"id"},"name":"rating","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/findbyrating","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/findbyrating","q":{"exist":["page"]},"r":{},"s":[{"lit":"api"},{"lit":"findbyrating"}],"t":{"req":"`reqdata`","res":"`body.AniData`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"rating","name__orig":"rating","Name":"Rating","name_":"rating","name-":"rating","NAME":"RATING","index$":5}, {"active":true,"entity":"rating","key$":"BasicRatingFlow","kind":"basic","name":"BasicRatingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"rating_ref01"}}],"index$":0}]}, 'Rating', {"GET /api/findbyrating":{"protocol":"http","operationId":"findByRating","responses":{"200":{"description":"Paginated list of top-rated anime","content":{"application/json":{"schema":{"type":"object","properties":{"currentPage":{"description":"Current page number","key$":"currentPage","type":"integer"},"AniData":{"description":"Array of top-rated anime","items":{"properties":{"Aired":{"description":"Air date range","type":"string","key$":"Aired"},"Cover":{"description":"Cover image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"Cover"},"DescripTion":{"description":"Anime description","type":"string","key$":"DescripTion"},"Duration":{"description":"Episode duration","type":"string","key$":"Duration"},"Genres":{"description":"List of genres","items":{"type":"string"},"type":"array","key$":"Genres"},"ImagePath":{"description":"Image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"ImagePath"},"MALScore":{"description":"MyAnimeList score","type":"string","key$":"MALScore"},"Name":{"description":"Anime name","type":"string","key$":"Name"},"Premiered":{"description":"Premiere season","type":"string","key$":"Premiered"},"RatingsNum":{"description":"Number of ratings","type":"integer","key$":"RatingsNum"},"Status":{"description":"Airing status","type":"string","key$":"Status"},"Studios":{"description":"Production studio","type":"string","key$":"Studios"},"Synonyms":{"description":"Alternative names","type":"string","key$":"Synonyms"},"_id":{"description":"Anime ID","type":"integer","key$":"_id"},"epCount":{"description":"Episode count","type":"integer","key$":"epCount"},"finder":{"description":"Slug identifier","type":"string","key$":"finder"}},"type":"object","x-ref":"#/components/schemas/AnimeInfo","index$":0},"key$":"AniData","type":"array"}},"x-ref":"#/components/schemas/RatingResponse"},"example":{"currentPage":1,"AniData":[{"_id":2454,"Name":"Frieren: Beyond Journey's End","ImagePath":"https://...","MALScore":"9.36","RatingsNum":50,"DescripTion":"...","finder":"frieren-beyond-journeys-end"}]}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"page","in":"query","required":false,"description":"Page number, default 1","schema":{"type":"integer","default":1},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let rating_ref01_data = Object.values(setup.data.existing.rating)[0] as any

    // LIST
    const rating_ref01_ent = client.Rating()
    const rating_ref01_match: any = {}

    const rating_ref01_list = (await rating_ref01_ent.list(rating_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/rating/RatingTestData.json')

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
    ['rating01','rating02','rating03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_RATING_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_RATING_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_RATING_ENTID']
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
  
