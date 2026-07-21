<?php
declare(strict_types=1);

// Anipub SDK utility: result_body

class AnipubResultBody
{
    public static function call(AnipubContext $ctx): ?AnipubResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
