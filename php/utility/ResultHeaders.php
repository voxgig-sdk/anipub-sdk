<?php
declare(strict_types=1);

// Anipub SDK utility: result_headers

class AnipubResultHeaders
{
    public static function call(AnipubContext $ctx): ?AnipubResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
