import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";

export function pathsEqual(path1: string, path2: string) {
	const normalizedPath1 = path1.replace(/^\/|\/$/g, "").toLowerCase();
	const normalizedPath2 = path2.replace(/^\/|\/$/g, "").toLowerCase();
	return normalizedPath1 === normalizedPath2;
}

function joinUrl(...parts: string[]): string {
	const joined = parts.join("/");
	return joined.replace(/\/+/g, "/");
}

export function getPostUrlBySlug(slug: string): string {
	return url(`/posts/${slug}/`);
}

export function getTagUrl(tag: string): string {
	if (!tag) return url("/archive/");
	return url(`/archive/?tag=${encodeURIComponent(tag.trim())}`);
}

export function getCategoryUrl(category: string | null): string {
	if (
		!category ||
		category.trim() === "" ||
		category.trim().toLowerCase() === i18n(I18nKey.uncategorized).toLowerCase()
	)
		return url("/archive/?uncategorized=true");
	return url(`/archive/?category=${encodeURIComponent(category.trim())}`);
}

export function getDir(path: string): string {
	const lastSlashIndex = path.lastIndexOf("/");
	if (lastSlashIndex < 0) {
		return "/";
	}
	return path.substring(0, lastSlashIndex + 1);
}

export function url(path: string) {
	return joinUrl("", import.meta.env.BASE_URL, path);
}

const IMAGE_FILE_REGEX = /\.(jpe?g|png|webp|gif|avif|svg|bmp|ico)$/i;

/**
 * Random image APIs (e.g. https://img.moehu.org/pic.php) return a different
 * image per request, but the browser caches by URL, so every <img> sharing
 * the same URL on a page shows the same picture. Append a seed derived from
 * the post so each post gets its own image, while the same post keeps a
 * stable cover across pages and visits.
 */
export function seedRandomImage(src: string, seed: string): string {
	try {
		if (!/^https?:\/\//i.test(src)) return src;
		const { pathname, search } = new URL(src);
		if (IMAGE_FILE_REGEX.test(pathname)) return src;
		if (search.includes("_r=")) return src;
		return `${src}${search ? "&" : "?"}_r=${encodeURIComponent(seed)}`;
	} catch {
		return src;
	}
}
