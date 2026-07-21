<?php
declare(strict_types=1);

// Anipub SDK utility: prepare_body

class AnipubPrepareBody
{
    public static function call(AnipubContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
