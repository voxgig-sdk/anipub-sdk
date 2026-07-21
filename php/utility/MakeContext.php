<?php
declare(strict_types=1);

// Anipub SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class AnipubMakeContext
{
    public static function call(array $ctxmap, ?AnipubContext $basectx): AnipubContext
    {
        return new AnipubContext($ctxmap, $basectx);
    }
}
