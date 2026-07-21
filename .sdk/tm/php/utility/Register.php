<?php
declare(strict_types=1);

// Anipub SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

AnipubUtility::setRegistrar(function (AnipubUtility $u): void {
    $u->clean = [AnipubClean::class, 'call'];
    $u->done = [AnipubDone::class, 'call'];
    $u->make_error = [AnipubMakeError::class, 'call'];
    $u->feature_add = [AnipubFeatureAdd::class, 'call'];
    $u->feature_hook = [AnipubFeatureHook::class, 'call'];
    $u->feature_init = [AnipubFeatureInit::class, 'call'];
    $u->fetcher = [AnipubFetcher::class, 'call'];
    $u->make_fetch_def = [AnipubMakeFetchDef::class, 'call'];
    $u->make_context = [AnipubMakeContext::class, 'call'];
    $u->make_options = [AnipubMakeOptions::class, 'call'];
    $u->make_request = [AnipubMakeRequest::class, 'call'];
    $u->make_response = [AnipubMakeResponse::class, 'call'];
    $u->make_result = [AnipubMakeResult::class, 'call'];
    $u->make_point = [AnipubMakePoint::class, 'call'];
    $u->make_spec = [AnipubMakeSpec::class, 'call'];
    $u->make_url = [AnipubMakeUrl::class, 'call'];
    $u->param = [AnipubParam::class, 'call'];
    $u->prepare_auth = [AnipubPrepareAuth::class, 'call'];
    $u->prepare_body = [AnipubPrepareBody::class, 'call'];
    $u->prepare_headers = [AnipubPrepareHeaders::class, 'call'];
    $u->prepare_method = [AnipubPrepareMethod::class, 'call'];
    $u->prepare_params = [AnipubPrepareParams::class, 'call'];
    $u->prepare_path = [AnipubPreparePath::class, 'call'];
    $u->prepare_query = [AnipubPrepareQuery::class, 'call'];
    $u->result_basic = [AnipubResultBasic::class, 'call'];
    $u->result_body = [AnipubResultBody::class, 'call'];
    $u->result_headers = [AnipubResultHeaders::class, 'call'];
    $u->transform_request = [AnipubTransformRequest::class, 'call'];
    $u->transform_response = [AnipubTransformResponse::class, 'call'];
});
