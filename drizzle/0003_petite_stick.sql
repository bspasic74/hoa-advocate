CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`phone` text,
	`address_id` text,
	`is_admin` integer DEFAULT false,
	`created_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `addresses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`street_address` text NOT NULL,
	`city` text NOT NULL,
	`state` text NOT NULL,
	`zip_code` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `addresses_street_address_unique` ON `addresses` (`street_address`);--> statement-breakpoint
CREATE TABLE `community_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`admin_id` text NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`shortdescription` text NOT NULL,
	`body` text,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`admin_id` text NOT NULL,
	`title` text NOT NULL,
	`shortdescription` text NOT NULL,
	`description` text,
	`event_date` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `proposals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`admin_id` text NOT NULL,
	`title` text NOT NULL,
	`shortdescription` text NOT NULL,
	`description` text,
	`startdate` integer NOT NULL,
	`enddate` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`proposal_id` text NOT NULL,
	`user_id` text NOT NULL,
	`address_id` text NOT NULL,
	`vote_value` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()),
	`modified_at` integer
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`first_name` text
);
