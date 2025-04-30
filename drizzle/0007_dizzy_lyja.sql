CREATE TABLE `verified_addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip_code` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `verified_addresses_street_address_unique` ON `verified_addresses` (`street_address`);