<?php
declare(strict_types=1);

// Anipub SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class AnipubFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new AnipubBaseFeature();
            case "test":
                return new AnipubTestFeature();
            default:
                return new AnipubBaseFeature();
        }
    }
}
