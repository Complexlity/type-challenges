type DayCounter<
  Start extends number,
  End extends number,
	> =
_DayCounter<Start,End>;

type BuildArray<T extends number, Acc extends 1[] = []> =
	Acc['length'] extends T ? Acc : BuildArray<T, [...Acc, 1]>

type _DayCounter<
	Start extends number,
	End extends number,
	Incrementor extends 1[] = BuildArray<Start>,
> =
	Incrementor['length'] extends End?
	End
	: Incrementor['length'] | _DayCounter<Start, End, [...Incrementor, 1]
	>

type __DayCounter<
	Start extends number,
	End extends number,
	Incrementor extends 1[] = BuildArray<Start>,
	Acc extends number[] = []
> =
	Acc[0] extends End?
	Acc[number]
	: __DayCounter<Start, End, [...Incrementor, 1], [Incrementor['length'], ...Acc]
	>

type xo = _DayCounter<1, 999>;
//     ^?

type y0 = __DayCounter<1, 999>;
//    ^?

type z0 = __DayCounter<1, 999>;
//    ^?