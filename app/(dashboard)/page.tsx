import { GetFormStats, GetForms } from "@/actions/form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { title } from "process";
import { ReactNode, Suspense } from "react";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { Separator } from "@/components/ui/separator";
import CreateFormBtn from "@/components/CreateFormBtn";
import { Form } from "@prisma/client";

export default function Home() {
	return (
		<div className="container pt-4">
			<Suspense fallback={<StatsCards loading={true} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className="my-6" />
			<h2 className="text-4xl font-bold col-span-2">Your forms</h2>
			<Separator className="my-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<CreateFormBtn />
				<Suspense
					fallback={[1, 2, 3, 4].map((el) => <FormCardSkeleton key={el} />)}
				>
					<FormCards />
				</Suspense>
			</div>
		</div>
	);
}

async function CardStatsWrapper() {
	const stats = await GetFormStats();
	return <StatsCards loading={false} data={stats} />;
}

interface StatsCardProps {
	data?: Awaited<ReturnType<typeof GetFormStats>>;
	loading: boolean;
}

function StatsCards(props: StatsCardProps) {
	const { data, loading } = props;

	return (
		<div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				icon={<LuView className="text-pink-600" />}
				helperText="All time form visits"
				value={data?.visits.toLocaleString() || ""}
				loading={loading}
				className="shadow-md shadow-pink-600"
			/>
			<StatsCard
				title="Total submissions"
				icon={<FaWpforms className="text-red-600" />}
				helperText="All time form submissions"
				value={data?.submissions.toLocaleString() || ""}
				loading={loading}
				className="shadow-md shadow-red-600"
			/>
			<StatsCard
				title="Submission rate"
				icon={<HiCursorClick className="text-orange-600" />}
				helperText="Visits that result in form submissions"
				value={`${data?.submissionRate.toLocaleString()}%` || ""}
				loading={loading}
				className="shadow-md shadow-orange-600"
			/>
			<StatsCard
				title="Bounce rate"
				icon={<TbArrowBounce className="text-yellow-600" />}
				helperText="Visits that result in form submissions"
				value={`${data?.bounceRate.toLocaleString()}%` || ""}
				loading={loading}
				className="shadow-md shadow-yellow-600"
			/>
		</div>
	);
}

export function StatsCard({
	title,
	value,
	icon,
	helperText,
	loading,
	className,
}: {
	title: string;
	value: string;
	helperText: string;
	className: string;
	loading: boolean;
	icon: ReactNode;
}) {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">
					{loading && (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
					)}
					{!loading && value}
				</div>
				<p className="text-xs text-muted-foreground pt-1">{helperText}</p>
			</CardContent>
		</Card>
	);
}

function FormCardSkeleton() {
	return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
}

async function FormCards() {
	const forms = await GetForms();
	return (
		<>
			{forms.map((form) => (
				<FormCard key={form.id} form={form} />
			))}
		</>
	);
}

function FormCard({ form }: { form: Form }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>
					<span className="flex items-center gap-2 justify-between">
						{form.name}
					</span>
				</CardTitle>
			</CardHeader>
		</Card>
	);
}
