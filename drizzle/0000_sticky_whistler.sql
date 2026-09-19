CREATE TABLE `contact_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`email` text,
	`preferred_language` text NOT NULL,
	`consent` integer NOT NULL,
	`source` text DEFAULT 'website' NOT NULL,
	`created_at` text NOT NULL
);
