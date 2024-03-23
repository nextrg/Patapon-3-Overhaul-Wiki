export async function load({ fetch }) {
	const response = await fetch('/api/posts')
	const posts = (await response.json()) as {
		metadata: PageMeta
		path: string
	}[]

	const categories = new Map<
		string,
		{
			metadata: PageMeta
			path: string
		}[]
	>()

	posts.forEach((element) => {
		const category = element.metadata.category
		if (!categories.get(category)) {
			categories.set(category, [])
		}
		categories.get(category)?.push(element)
	})

	return {
		pages: posts,
		categories
	}
}
