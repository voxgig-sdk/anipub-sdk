

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


describe('InfoEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ANIPUB_TEST_LIVE=TRUE.
  afterEach(liveDelay('ANIPUB_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = AnipubSDK.test()
    const ent = testsdk.Info()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ANIPUB_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'info.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Aired":{"a":true,"h":"Aired","n":"Aired","r":false,"sh":"Air date range","t":"`$STRING`","key$":"Aired","index$":0},"Cover":{"a":true,"h":"Cover","n":"Cover","r":false,"sh":"Cover image path or URL.","t":"`$STRING`","key$":"Cover","index$":1},"DescripTion":{"a":true,"h":"Descrip Tion","n":"DescripTion","r":false,"sh":"Anime description","t":"`$STRING`","key$":"DescripTion","index$":2},"Duration":{"a":true,"h":"Duration","n":"Duration","r":false,"sh":"Episode duration","t":"`$STRING`","key$":"Duration","index$":3},"Genres":{"a":true,"h":"Genres","n":"Genres","r":false,"sh":"List of genres","t":"`$ARRAY`","key$":"Genres","index$":4},"ImagePath":{"a":true,"h":"Image Path","n":"ImagePath","r":false,"sh":"Image path or URL.","t":"`$STRING`","key$":"ImagePath","index$":5},"MALScore":{"a":true,"h":"Mal Score","n":"MALScore","r":false,"sh":"MyAnimeList score","t":"`$STRING`","key$":"MALScore","index$":6},"Name":{"a":true,"h":"Name","n":"Name","r":false,"sh":"Anime name","t":"`$STRING`","key$":"Name","index$":7},"Premiered":{"a":true,"h":"Premiered","n":"Premiered","r":false,"sh":"Premiere season","t":"`$STRING`","key$":"Premiered","index$":8},"RatingsNum":{"a":true,"h":"Ratings Num","n":"RatingsNum","r":false,"sh":"Number of ratings","t":"`$INTEGER`","key$":"RatingsNum","index$":9},"Status":{"a":true,"h":"Status","n":"Status","r":false,"sh":"Airing status","t":"`$STRING`","key$":"Status","index$":10},"Studios":{"a":true,"h":"Studios","n":"Studios","r":false,"sh":"Production studio","t":"`$STRING`","key$":"Studios","index$":11},"Synonyms":{"a":true,"h":"Synonyms","n":"Synonyms","r":false,"sh":"Alternative names","t":"`$STRING`","key$":"Synonyms","index$":12},"epCount":{"a":true,"h":"Ep Count","n":"epCount","r":false,"sh":"Episode count","t":"`$INTEGER`","key$":"epCount","index$":13},"finder":{"a":true,"h":"Finder","n":"finder","r":false,"sh":"Slug identifier","t":"`$STRING`","key$":"finder","index$":14},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Anime ID","t":"`$INTEGER`","key$":"id","index$":15}},"id":{"field":"id","name":"id"},"name":"info","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/info/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"black-clover","k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/api/info/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"api"},{"lit":"info"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"info","name__orig":"info","Name":"Info","name_":"info","name-":"info","NAME":"INFO","index$":4}, {"active":true,"entity":"info","key$":"BasicInfoFlow","kind":"basic","name":"BasicInfoFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"info_ref01","srcdatavar":"info_ref01_data","suffix":"_dt0"},"m":{"id":"info01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-info_ref01"}}],"index$":0}]}, 'Info', {"GET /api/info/{id}":{"protocol":"http","operationId":"getAnimeInfo","responses":{"200":{"description":"Successful response with anime metadata","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"Anime ID","type":"integer","key$":"_id"},"Name":{"description":"Anime name","type":"string","key$":"Name"},"ImagePath":{"description":"Image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"ImagePath"},"Cover":{"description":"Cover image path or URL. Prepend https://anipub.xyz/ if relative","type":"string","key$":"Cover"},"Synonyms":{"description":"Alternative names","type":"string","key$":"Synonyms"},"Aired":{"description":"Air date range","type":"string","key$":"Aired"},"Premiered":{"description":"Premiere season","type":"string","key$":"Premiered"},"RatingsNum":{"description":"Number of ratings","type":"integer","key$":"RatingsNum"},"Genres":{"description":"List of genres","items":{"type":"string"},"type":"array","key$":"Genres"},"Studios":{"description":"Production studio","type":"string","key$":"Studios"},"DescripTion":{"description":"Anime description","type":"string","key$":"DescripTion"},"Duration":{"description":"Episode duration","type":"string","key$":"Duration"},"MALScore":{"description":"MyAnimeList score","type":"string","key$":"MALScore"},"Status":{"description":"Airing status","type":"string","key$":"Status"},"epCount":{"description":"Episode count","type":"integer","key$":"epCount"},"finder":{"description":"Slug identifier","type":"string","key$":"finder"}},"x-ref":"#/components/schemas/AnimeInfo","index$":0},"example":{"_id":61,"Name":"Black Clover","ImagePath":"https://...","Cover":"https://...","Synonyms":"...","Aired":"Oct 3, 2017 to Mar 30, 2021","Premiered":"Fall 2017","RatingsNum":45,"Genres":["action","fantasy","magic"],"Studios":"Pierrot","DescripTion":"...","Duration":"25m","MALScore":"8.88","Status":"Finished Airing","epCount":170}}}},"404":{"description":"No anime with that ID or name","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"status":{"type":"integer","description":"HTTP status code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"id","in":"path","required":true,"description":"Numeric ID like 61 or slug like black-clover, one-piece, high-school-dxd","schema":{"oneOf":[{"type":"integer"},{"type":"string"}]},"example":"black-clover","index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let info_ref01_data = Object.values(setup.data.existing.info)[0] as any

    // LOAD
    const info_ref01_ent = client.Info()
    const info_ref01_match_dt0: any = {}
    info_ref01_match_dt0.id = info_ref01_data.id
    const info_ref01_data_dt0 = (await info_ref01_ent.load(info_ref01_match_dt0)).data()
    assert(info_ref01_data_dt0.id === info_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/info/InfoTestData.json')

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
    ['info01','info02','info03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ANIPUB_TEST_INFO_ENTID': idmap,
    'ANIPUB_TEST_LIVE': 'FALSE',
    'ANIPUB_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ANIPUB_TEST_INFO_ENTID']

  const live = 'TRUE' === env.ANIPUB_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ANIPUB_TEST_INFO_ENTID']
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
  
