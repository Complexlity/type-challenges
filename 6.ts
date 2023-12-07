type Good<T extends { [key: string]: any }> = {
	[P in keyof T as  `good${P}`]: T[P]
}

type x = Good<{
//    ^?
	wow: 'ouch',
	true: 2,
	only: 44``
}>
