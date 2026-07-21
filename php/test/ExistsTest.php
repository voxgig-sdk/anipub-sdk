<?php
declare(strict_types=1);

// Anipub SDK exists test

require_once __DIR__ . '/../anipub_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = AnipubSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
