

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


describe('SearchallEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Searchall()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'searchall.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"currentPage":{"a":true,"h":"Current Page","n":"currentPage","r":false,"sh":"Current page number","t":"`$INTEGER`","key$":"currentPage","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"wholePage":{"a":true,"h":"Whole Page","n":"wholePage","r":false,"sh":"Array of anime on current page","t":"`$ARRAY`","key$":"wholePage","index$":2}},"id":{"field":"id","name":"id"},"name":"searchall","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/searchall/{name}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"name","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":1,"k":"query","n":"page","or":"page","r":false,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/api/searchall/{name}","q":{"exist":["id","page"]},"r":{"param":{"name":"id"}},"s":[{"lit":"api"},{"lit":"searchall"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"searchall","name__orig":"searchall","Name":"Searchall","name_":"searchall","name-":"searchall","NAME":"SEARCHALL","index$":7}, {"active":true,"entity":"searchall","key$":"BasicSearchallFlow","kind":"basic","name":"BasicSearchallFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"searchall_ref01","srcdatavar":"searchall_ref01_data","suffix":"_dt0"},"m":{"id":"searchall01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-searchall_ref01"}}],"index$":0}]}, 'Searchall', {"GET /api/searchall/{name}":{"protocol":"http","operationId":"searchAll","responses":{"200":{"description":"Paginated search results","content":{"application/json":{"schema":{"type":"object","properties":{"currentPage":{"description":"Current page number","key$":"currentPage","type":"integer"},"wholePage":{"description":"Array of anime on current page","items":{"properties":{"Aired":{"description":"Air date range","type":"string","key$":"Aired"},"Cover":{"description":"Cover image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"Cover"},"DescripTion":{"description":"Anime description","type":"string","key$":"DescripTion"},"Duration":{"description":"Episode duration","type":"string","key$":"Duration"},"Genres":{"description":"List of genres","items":{"type":"string"},"type":"array","key$":"Genres"},"ImagePath":{"description":"Image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"ImagePath"},"MALScore":{"description":"MyAnimeList score","type":"string","key$":"MALScore"},"Name":{"description":"Anime name","type":"string","key$":"Name"},"Premiered":{"description":"Premiere season","type":"string","key$":"Premiered"},"RatingsNum":{"description":"Number of ratings","type":"integer","key$":"RatingsNum"},"Status":{"description":"Airing status","type":"string","key$":"Status"},"Studios":{"description":"Production studio","type":"string","key$":"Studios"},"Synonyms":{"description":"Alternative names","type":"string","key$":"Synonyms"},"_id":{"description":"Anime ID","type":"integer","key$":"_id"},"epCount":{"description":"Episode count","type":"integer","key$":"epCount"},"finder":{"description":"Slug identifier","type":"string","key$":"finder"}},"type":"object","x-ref":"#/components/schemas/AnimeInfo","index$":0},"key$":"wholePage","type":"array"}},"x-ref":"#/components/schemas/PaginatedAnimeList","index$":0}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"name","in":"path","required":true,"description":"Search query","schema":{"type":"string"},"index$":0},{"name":"page","in":"query","required":false,"description":"Page number, default 1","schema":{"type":"integer","default":1},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let searchall_ref01_data = Object.values(setup.data.existing.searchall)[0] as any

    // LOAD
    const searchall_ref01_ent = client.Searchall()
    const searchall_ref01_match_dt0: any = {}
    searchall_ref01_match_dt0.id = searchall_ref01_data.id
    const searchall_ref01_data_dt0 = (await searchall_ref01_ent.load(searchall_ref01_match_dt0)).data()
    assert(searchall_ref01_data_dt0.id === searchall_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/searchall/SearchallTestData.json')

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
    ['searchall01','searchall02','searchall03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_SEARCHALL_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_SEARCHALL_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_SEARCHALL_ENTID']
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
  
