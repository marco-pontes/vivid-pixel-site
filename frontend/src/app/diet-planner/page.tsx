"use client";

import React, { useState, useMemo } from "react";
import {
	CalendarDays,
	ShoppingCart,
	Utensils,
	Carrot,
	Apple,
	Layers,
	Plus,
	Trash2,
	Info,
	LayoutDashboard,
	ChefHat,
	LucideIcon,
} from "lucide-react";

// ============================================================================
// 1. DADOS INICIAIS (MOCK DB) E REGRAS DE NEGÓCIO
// ============================================================================

interface Ingredient {
	id: string;
	name: string;
	prep: string;
	unit: string;
	packageSize: number;
	price: number;
	category: string;
}

interface CombinationItem {
	ingredientId: string;
	qty: number;
}

interface Combination {
	id: string;
	name: string;
	type: "salada" | "fruta";
	items: CombinationItem[];
}

interface DishIngredient {
	ingredientId: string;
	qty: number;
}

interface Dish {
	id: string;
	name: string;
	ingredients: DishIngredient[];
	combinations: string[];
}

interface PlanDay {
	day: number;
	lunch: string | null;
	dinner: string | null;
}

const INITIAL_INGREDIENTS: Ingredient[] = [
	// Carnes / Proteínas (Mínimo 200g base)
	{
		id: "i3",
		name: "Sassami",
		prep: "Grelhado",
		unit: "g",
		packageSize: 1000,
		price: 22.0,
		category: "Proteína",
	},
	{
		id: "i4",
		name: "Tilápia",
		prep: "Grelhada",
		unit: "g",
		packageSize: 800,
		price: 45.0,
		category: "Proteína",
	},
	{
		id: "i5",
		name: "Contra-filé",
		prep: "Grelhado",
		unit: "g",
		packageSize: 1000,
		price: 48.0,
		category: "Proteína",
	},
	{
		id: "i10",
		name: "Carne Moída (Patinho)",
		prep: "Molho Bolonhesa",
		unit: "g",
		packageSize: 1000,
		price: 38.0,
		category: "Proteína",
	},
	{
		id: "i6",
		name: "Ovo",
		prep: "Cozido/Mexido/Frito",
		unit: "un",
		packageSize: 12,
		price: 10.0,
		category: "Proteína",
	},

	// Carboidratos Base
	{
		id: "i1",
		name: "Arroz",
		prep: "Cozido",
		unit: "g",
		packageSize: 1000,
		price: 6.0,
		category: "Carboidrato",
	},
	{
		id: "i2",
		name: "Feijão",
		prep: "Cozido",
		unit: "g",
		packageSize: 1000,
		price: 8.0,
		category: "Carboidrato",
	},
	{
		id: "i7",
		name: "Batata Doce",
		prep: "Cozida",
		unit: "g",
		packageSize: 1000,
		price: 5.0,
		category: "Carboidrato",
	},
	{
		id: "i8",
		name: "Batata Inglesa",
		prep: "Purê",
		unit: "g",
		packageSize: 1000,
		price: 6.0,
		category: "Carboidrato",
	},
	{
		id: "i9",
		name: "Macarrão",
		prep: "Cozido",
		unit: "g",
		packageSize: 500,
		price: 5.0,
		category: "Carboidrato",
	},
	{
		id: "i18",
		name: "Farofa Funcional",
		prep: "Tostada",
		unit: "g",
		packageSize: 500,
		price: 12.0,
		category: "Carboidrato",
	},

	// Vegetais / Salada
	{
		id: "i11",
		name: "Tomate",
		prep: "In natura/Molho",
		unit: "g",
		packageSize: 1000,
		price: 8.0,
		category: "Vegetal",
	},
	{
		id: "i12",
		name: "Alface Americana",
		prep: "In natura",
		unit: "maço",
		packageSize: 1,
		price: 4.0,
		category: "Vegetal",
	},
	{
		id: "i13",
		name: "Couve-flor",
		prep: "Cozida",
		unit: "maço",
		packageSize: 1,
		price: 7.0,
		category: "Vegetal",
	},
	{
		id: "i14",
		name: "Azeitona",
		prep: "Lavada",
		unit: "g",
		packageSize: 500,
		price: 15.0,
		category: "Vegetal",
	},
	{
		id: "i15",
		name: "Espinafre",
		prep: "Cozido",
		unit: "maço",
		packageSize: 1,
		price: 4.0,
		category: "Vegetal",
	},
	{
		id: "i16",
		name: "Brócolis",
		prep: "Cozido",
		unit: "maço",
		packageSize: 1,
		price: 6.0,
		category: "Vegetal",
	},
	{
		id: "i17",
		name: "Beterraba",
		prep: "Cozida",
		unit: "g",
		packageSize: 1000,
		price: 5.0,
		category: "Vegetal",
	},

	// Frutas (Banana em Kg)
	{
		id: "f1",
		name: "Maçã",
		prep: "Fatiada",
		unit: "un",
		packageSize: 6,
		price: 8.0,
		category: "Fruta",
	},
	{
		id: "f2",
		name: "Banana",
		prep: "In natura",
		unit: "g",
		packageSize: 1000,
		price: 6.0,
		category: "Fruta",
	},
	{
		id: "f3",
		name: "Mamão",
		prep: "Picado",
		unit: "un",
		packageSize: 1,
		price: 7.0,
		category: "Fruta",
	},
	{
		id: "f4",
		name: "Laranja",
		prep: "Descascada/Suco",
		unit: "un",
		packageSize: 10,
		price: 10.0,
		category: "Fruta",
	},
];

const INITIAL_COMBINATIONS: Combination[] = [
	{
		id: "c1",
		name: "Salada 1 (Leve)",
		type: "salada",
		items: [
			{ ingredientId: "i11", qty: 80 },
			{ ingredientId: "i12", qty: 0.2 },
			{ ingredientId: "i13", qty: 0.3 },
			{ ingredientId: "i14", qty: 30 },
		],
	},
	{
		id: "c2",
		name: "Salada 2 (Ferro)",
		type: "salada",
		items: [
			{ ingredientId: "i15", qty: 0.4 },
			{ ingredientId: "i16", qty: 0.4 },
			{ ingredientId: "i17", qty: 100 },
		],
	},
	{
		id: "c3",
		name: "Salada de Frutas",
		type: "fruta",
		items: [
			{ ingredientId: "f1", qty: 0.5 },
			{ ingredientId: "f2", qty: 120 },
			{ ingredientId: "f3", qty: 0.25 },
		],
	},
];

const INITIAL_DISHES: Dish[] = [
	{
		id: "d1",
		name: "Arroz, Feijão, Sassami (Almoço)",
		ingredients: [
			{ ingredientId: "i1", qty: 100 },
			{ ingredientId: "i2", qty: 80 },
			{ ingredientId: "i3", qty: 200 },
		],
		combinations: ["c2", "c3"],
	},
	{
		id: "d2",
		name: "Batata Doce, Tilápia (Jantar)",
		ingredients: [
			{ ingredientId: "i7", qty: 150 },
			{ ingredientId: "i4", qty: 200 },
		],
		combinations: ["c1"],
	},
	{
		id: "d3",
		name: "Purê, Tilápia (Almoço)",
		ingredients: [
			{ ingredientId: "i8", qty: 150 },
			{ ingredientId: "i4", qty: 200 },
		],
		combinations: ["c1"],
	},
	{
		id: "d4",
		name: "Arroz, Feijão, C.Filé c/ Ovo (Jantar)",
		ingredients: [
			{ ingredientId: "i1", qty: 100 },
			{ ingredientId: "i2", qty: 80 },
			{ ingredientId: "i5", qty: 200 },
			{ ingredientId: "i6", qty: 1 },
		],
		combinations: ["c2"],
	},
	{
		id: "d5",
		name: "Macarrão à Bolonhesa (Almoço)",
		ingredients: [
			{ ingredientId: "i9", qty: 100 },
			{ ingredientId: "i10", qty: 200 },
			{ ingredientId: "i11", qty: 100 },
		],
		combinations: ["c2"],
	},
	{
		id: "d6",
		name: "Arroz, Feijão, Sassami, Farofa (Jantar)",
		ingredients: [
			{ ingredientId: "i1", qty: 100 },
			{ ingredientId: "i2", qty: 80 },
			{ ingredientId: "i3", qty: 200 },
			{ ingredientId: "i18", qty: 30 },
		],
		combinations: ["c1", "c3"],
	},
	{
		id: "d7",
		name: "Batata Doce, Sassami (Almoço)",
		ingredients: [
			{ ingredientId: "i7", qty: 150 },
			{ ingredientId: "i3", qty: 200 },
		],
		combinations: ["c2", "c3"],
	},
	{
		id: "d8",
		name: "Macarrão à Bolonhesa (Jantar)",
		ingredients: [
			{ ingredientId: "i9", qty: 100 },
			{ ingredientId: "i10", qty: 200 },
			{ ingredientId: "i11", qty: 100 },
		],
		combinations: ["c1"],
	},
	{
		id: "d9",
		name: "Arroz, Feijão, Tilápia, Farofa (Almoço)",
		ingredients: [
			{ ingredientId: "i1", qty: 100 },
			{ ingredientId: "i2", qty: 80 },
			{ ingredientId: "i4", qty: 200 },
			{ ingredientId: "i18", qty: 30 },
		],
		combinations: ["c1"],
	},
	{
		id: "d10",
		name: "Purê, C.Filé c/ Ovo (Jantar)",
		ingredients: [
			{ ingredientId: "i8", qty: 150 },
			{ ingredientId: "i5", qty: 200 },
			{ ingredientId: "i6", qty: 1 },
		],
		combinations: ["c2"],
	},
];

const generateInitialPlan = (): PlanDay[] => {
	const weeklyPattern = [
		{ lunch: "d1", dinner: "d2" },
		{ lunch: "d3", dinner: "d4" },
		{ lunch: "d5", dinner: "d6" },
		{ lunch: "d7", dinner: "d8" },
		{ lunch: "d9", dinner: "d10" },
	];
	return Array.from({ length: 20 }, (_, i) => {
		const pattern = weeklyPattern[i % weeklyPattern.length]!;
		return {
			day: i + 1,
			lunch: pattern.lunch,
			dinner: pattern.dinner,
		};
	});
};

// ============================================================================
// 2. COMPONENTES DE UI GENÉRICOS
// ============================================================================

interface CardProps {
	children: React.ReactNode;
	className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
	<div
		className={`bg-white rounded-2xl shadow-sm border border-slate-200 p-5 ${className}`}
	>
		{children}
	</div>
);

interface SelectProps {
	value: string | null;
	onChange: (value: string | null) => void;
	options: { id: string; name: string }[];
	label?: string;
	placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
	value,
	onChange,
	options,
	label,
	placeholder = "Selecione...",
}) => (
	<div className="flex flex-col gap-1.5 w-full">
		{label && (
			<label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
				{label}
			</label>
		)}
		<select
			value={value || ""}
			onChange={(e) => onChange(e.target.value || null)}
			className="bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-full p-2.5 transition-all outline-none"
		>
			<option value="">-- {placeholder} --</option>
			{options.map((opt) => (
				<option key={opt.id} value={opt.id}>
					{opt.name}
				</option>
			))}
		</select>
	</div>
);

interface SummaryTableColumn {
	label: string;
	key: string;
	align?: "right" | "left";
}

interface SummaryTableProps {
	title: string;
	columns: SummaryTableColumn[];
	data: Record<string, string | number>;
}

const SummaryTable: React.FC<SummaryTableProps> = ({
	title,
	columns,
	data,
}) => (
	<div className="mb-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
		<div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
			<Info size={18} className="text-emerald-600" />
			<h3 className="font-bold text-slate-800 text-sm">{title}</h3>
		</div>
		<div className="overflow-x-auto">
			<table className="w-full text-sm text-left text-slate-600">
				<thead className="text-xs text-slate-500 uppercase bg-slate-50">
					<tr>
						{columns.map((col, idx) => (
							<th
								key={idx}
								className={`px-4 py-2 ${col.align === "right" ? "text-right" : ""}`}
							>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{columns.map((col, idx) => (
							<td
								key={idx}
								className={`px-4 py-3 font-medium text-slate-800 ${col.align === "right" ? "text-right" : ""}`}
							>
								{data[col.key]}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	</div>
);

// ============================================================================
// 3. APLICATIVO PRINCIPAL (NEXT.JS PAGE)
// ============================================================================

interface ShoppingItem extends Ingredient {
	qtyNeeded: number;
	packagesToBuy: number;
	packageCost: number;
	exactCost: number;
}

export default function App() {
	const [activeTab, setActiveTab] = useState("overview");

	const [ingredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS);
	const [combinations, setCombinations] =
		useState<Combination[]>(INITIAL_COMBINATIONS);
	const [dishes, setDishes] = useState<Dish[]>(INITIAL_DISHES);
	const [plan, setPlan] = useState<PlanDay[]>(generateInitialPlan());

	const dashboardData = useMemo(() => {
		let totalRefeicoes = 0;
		let diasPreenchidos = 0;
		const requiredIngredients: Record<string, number> = {};

		plan.forEach((day) => {
			let hasMeal = false;
			if (day.lunch) {
				totalRefeicoes++;
				hasMeal = true;
			}
			if (day.dinner) {
				totalRefeicoes++;
				hasMeal = true;
			}
			if (hasMeal) diasPreenchidos++;

			[day.lunch, day.dinner].forEach((dishId) => {
				if (!dishId) return;
				const dish = dishes.find((d) => d.id === dishId);
				if (!dish) return;

				dish.ingredients.forEach((ing) => {
					requiredIngredients[ing.ingredientId] =
						(requiredIngredients[ing.ingredientId] || 0) +
						Number(ing.qty);
				});

				dish.combinations.forEach((comboId) => {
					const combo = combinations.find((c) => c.id === comboId);
					if (combo) {
						combo.items.forEach((cItem) => {
							requiredIngredients[cItem.ingredientId] =
								(requiredIngredients[cItem.ingredientId] || 0) +
								Number(cItem.qty);
						});
					}
				});
			});
		});

		let grandPackageTotal = 0;
		let grandExactTotal = 0;

		const shoppingList = Object.keys(requiredIngredients)
			.map((ingId): ShoppingItem | null => {
				const ing = ingredients.find((i) => i.id === ingId);
				if (!ing) return null;

				const qtyNeeded = requiredIngredients[ingId] ?? 0;
				const packagesToBuy = Math.ceil(qtyNeeded / ing.packageSize);
				const packageCost = packagesToBuy * ing.price;
				const exactCost = (qtyNeeded / ing.packageSize) * ing.price;

				grandPackageTotal += packageCost;
				grandExactTotal += exactCost;

				return { ...ing, qtyNeeded, packagesToBuy, packageCost, exactCost };
			})
			.filter((item): item is ShoppingItem => item !== null)
			.sort((a, b) => b.packageCost - a.packageCost);

		return {
			planSummary: {
				diasTotais: plan.length,
				diasPreenchidos,
				totalRefeicoes,
				refeicoesMedia: (totalRefeicoes / (diasPreenchidos || 1)).toFixed(1),
			},
			shoppingSummary: {
				totalItens: shoppingList.length,
				custoTotal: `€ ${grandPackageTotal.toFixed(2).replace(".", ",")}`,
				mediaPorDia: `€ ${(grandPackageTotal / (diasPreenchidos || 1)).toFixed(2).replace(".", ",")}`,
			},
			dishesSummary: {
				totalPratos: dishes.length,
				totalCombinacoes: combinations.length,
				ingredientesCadastrados: ingredients.length,
			},
			shoppingList,
			grandPackageTotal,
			grandExactTotal,
		};
	}, [plan, dishes, combinations, ingredients]);

	const handleDayChange = (
		dayIndex: number,
		mealType: "lunch" | "dinner",
		dishId: string | null
	) => {
		setPlan(
			plan.map((p, idx) =>
				idx === dayIndex ? { ...p, [mealType]: dishId } : p
			)
		);
	};

	const handleDishChange = (
		dishId: string,
		field: keyof Dish,
		value: string | DishIngredient[] | string[]
	) => {
		setDishes(
			dishes.map((d) => (d.id === dishId ? { ...d, [field]: value } : d))
		);
	};

	const addEmptyDish = () => {
		const newId = `d${Date.now()}`;
		setDishes([
			{ id: newId, name: "Novo Prato", ingredients: [], combinations: [] },
			...dishes,
		]);
	};

	const removeDish = (dishId: string) => {
		setDishes(dishes.filter((d) => d.id !== dishId));
		setPlan(
			plan.map((p) => ({
				...p,
				lunch: p.lunch === dishId ? null : p.lunch,
				dinner: p.dinner === dishId ? null : p.dinner,
			}))
		);
	};

	const addEmptyCombination = () => {
		const newId = `c${Date.now()}`;
		setCombinations([
			{ id: newId, name: "Nova Combinação", type: "salada", items: [] },
			...combinations,
		]);
	};

	const removeCombination = (comboId: string) => {
		setCombinations(combinations.filter((c) => c.id !== comboId));
		setDishes(
			dishes.map((d) => ({
				...d,
				combinations: d.combinations.filter((id) => id !== comboId),
			}))
		);
	};

	const formatMealCell = (dishId: string | null) => {
		if (!dishId)
			return <span className="text-slate-300 italic text-xs">Pular</span>;
		const dish = dishes.find((d) => d.id === dishId);
		if (!dish) return null;

		const saladas = dish.combinations
			.map((cid) => combinations.find((c) => c.id === cid))
			.filter(
				(c): c is Combination =>
					c !== undefined && c !== null && c.type === "salada"
			)
			.map((c) => c.name)
			.join(" + ");

		return (
			<div className="flex flex-col gap-0.5">
				<span className="font-bold text-slate-800 leading-tight">
					{dish.name}
				</span>
				{saladas && (
					<span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded w-fit border border-emerald-200 mt-1">
						{saladas}
					</span>
				)}
			</div>
		);
	};

	const formatDessertCell = (
		dishIdLunch: string | null,
		dishIdDinner: string | null
	) => {
		const frutas: string[] = [];
		[dishIdLunch, dishIdDinner].forEach((id) => {
			if (!id) return;
			const dish = dishes.find((d) => d.id === id);
			if (dish) {
				dish.combinations.forEach((cid) => {
					const combo = combinations.find((c) => c.id === cid);
					if (combo && combo.type === "fruta") frutas.push(combo.name);
				});
			}
		});

		if (frutas.length === 0)
			return <span className="text-slate-300 italic text-xs">-</span>;
		const uniqueFrutas = [...new Set(frutas)];

		return (
			<div className="flex flex-col gap-1">
				{uniqueFrutas.map((f) => (
					<span
						key={f}
						className="text-[10px] bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded border border-orange-200 flex items-center gap-1 w-fit"
					>
						<Apple size={10} /> {f}
					</span>
				))}
			</div>
		);
	};

	const renderOverview = () => (
		<div className="space-y-8 fade-in">
			<Card className="p-0 overflow-hidden border-slate-200 shadow-md">
				<div className="bg-slate-800 px-5 py-4 border-b border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center text-white gap-4">
					<h2 className="text-lg font-black flex items-center gap-2">
						<ShoppingCart size={20} className="text-emerald-400" />
						Resumo de Quantidades e Custos
					</h2>
					<div className="flex gap-6">
						<div className="text-right">
							<div className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
								Custo de Consumo Exato
							</div>
							<div className="text-xl font-bold text-slate-300">
								R$ {dashboardData.grandExactTotal.toFixed(2).replace(".", ",")}
							</div>
						</div>
						<div className="text-right border-l border-slate-600 pl-6">
							<div className="text-[10px] text-emerald-400 uppercase tracking-wider font-bold">
								Desembolso no Mercado (Pacotes)
							</div>
							<div className="text-2xl font-black text-emerald-400">
								R${" "}
								{dashboardData.grandPackageTotal.toFixed(2).replace(".", ",")}
							</div>
						</div>
					</div>
				</div>
				<div className="overflow-x-auto max-h-[350px]">
					<table className="w-full text-sm text-left text-slate-600 relative">
						<thead className="text-xs text-slate-500 uppercase bg-slate-100 sticky top-0 shadow-sm z-10">
							<tr>
								<th className="px-5 py-3 font-bold border-b border-slate-200">
									Ingrediente
								</th>
								<th className="px-5 py-3 font-bold text-center border-b border-slate-200">
									Consumo Total (Exato)
								</th>
								<th className="px-5 py-3 font-bold text-center border-b border-slate-200 text-emerald-700">
									Pacotes a Comprar
								</th>
								<th className="px-5 py-3 font-bold text-right border-b border-slate-200">
									Custo do Consumo
								</th>
								<th className="px-5 py-3 font-bold text-right border-b border-slate-200 text-emerald-700">
									Gasto no Caixa
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{dashboardData.shoppingList.map((item) => (
								<tr
									key={item.id}
									className="bg-white hover:bg-slate-50 transition-colors"
								>
									<td className="px-5 py-3 font-bold text-slate-800">
										{item.name}
									</td>

									<td className="px-5 py-3 text-center">
										<span className="font-medium text-slate-700">
											{item.qtyNeeded.toFixed(1)}
										</span>{" "}
										<span className="text-slate-400 text-xs">{item.unit}</span>
									</td>

									<td className="px-5 py-3 text-center bg-emerald-50/30">
										<span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
											{item.packagesToBuy} un.
										</span>
										<div className="text-[10px] text-slate-400 mt-1">
											(de {item.packageSize}
											{item.unit})
										</div>
									</td>

									<td className="px-5 py-3 text-right font-medium text-slate-500">
										R$ {item.exactCost.toFixed(2).replace(".", ",")}
									</td>

									<td className="px-5 py-3 text-right font-bold text-emerald-800 bg-emerald-50/30">
										R$ {item.packageCost.toFixed(2).replace(".", ",")}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>

			<Card className="p-0 overflow-hidden border-slate-200 shadow-md">
				<div className="bg-white px-5 py-4 border-b border-slate-200 flex justify-between items-center">
					<h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
						<CalendarDays size={20} className="text-emerald-600" />
						Grade Mensal Condensada
					</h2>
					<span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold border border-slate-200">
						{plan.length} Dias Planejados
					</span>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-sm text-left text-slate-600">
						<thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
							<tr>
								<th className="px-4 py-3 w-16 text-center font-bold">Dia</th>
								<th className="px-4 py-3 font-bold w-[38%]">
									Almoço (+ Saladas)
								</th>
								<th className="px-4 py-3 font-bold w-[38%]">
									Janta (+ Saladas)
								</th>
								<th className="px-4 py-3 font-bold">Sobremesa</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{plan.map((dayPlan, idx) => (
								<tr
									key={dayPlan.day}
									className={idx % 2 === 0 ? "bg-white" : "bg-slate-50"}
								>
									<td className="px-4 py-4 text-center font-black text-slate-400">
										{String(dayPlan.day).padStart(2, "0")}
									</td>
									<td className="px-4 py-3 align-top">
										{formatMealCell(dayPlan.lunch)}
									</td>
									<td className="px-4 py-3 align-top">
										{formatMealCell(dayPlan.dinner)}
									</td>
									<td className="px-4 py-3 align-top">
										{formatDessertCell(dayPlan.lunch, dayPlan.dinner)}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Card>

			<Card className="p-0 overflow-hidden border-slate-200 shadow-md">
				<div className="bg-emerald-50 px-5 py-4 border-b border-emerald-100 flex items-center gap-2 text-emerald-900">
					<ChefHat size={20} className="text-emerald-600" />
					<h2 className="text-lg font-black">
						Manual de Combinações (Saladas e Frutas)
					</h2>
				</div>
				<div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white">
					{combinations.map((combo) => (
						<div
							key={combo.id}
							className="border border-slate-200 rounded-xl p-4 bg-slate-50 relative overflow-hidden"
						>
							<div
								className={`absolute top-0 left-0 w-1 h-full ${combo.type === "fruta" ? "bg-orange-400" : "bg-emerald-400"}`}
							></div>
							<h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
								{combo.type === "fruta" ? (
									<Apple size={16} className="text-orange-500" />
								) : (
									<Carrot size={16} className="text-emerald-500" />
								)}
								{combo.name}
							</h3>
							<ul className="space-y-2">
								{combo.items.map((item) => {
									const ing = ingredients.find(
										(i) => i.id === item.ingredientId
									);
									if (!ing) return null;
									return (
										<li
											key={item.ingredientId}
											className="flex justify-between items-center text-sm"
										>
											<span className="text-slate-700 font-medium">
												{ing.name}{" "}
												<span className="text-[10px] text-slate-400 ml-1">
													({ing.prep})
												</span>
											</span>
											<span className="text-xs font-bold bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
												{item.qty} {ing.unit}
											</span>
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</div>
			</Card>
		</div>
	);

	const renderPlanner = () => (
		<div className="space-y-6 fade-in">
			<SummaryTable
				title="Resumo do Planejamento"
				columns={[
					{ label: "Dias Totais", key: "diasTotais" },
					{ label: "Dias c/ Refeição", key: "diasPreenchidos" },
					{ label: "Total Refeições", key: "totalRefeicoes" },
					{ label: "Média Ref/Dia", key: "refeicoesMedia" },
				]}
				data={dashboardData.planSummary}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{plan.map((dayPlan, idx) => (
					<Card
						key={dayPlan.day}
						className={`flex flex-col gap-3 transition-shadow border-t-4 ${dayPlan.lunch || dayPlan.dinner ? "border-t-emerald-500" : "border-t-slate-300 opacity-80"}`}
					>
						<div className="flex items-center justify-between border-b border-slate-100 pb-2">
							<h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
								<CalendarDays size={16} className="text-emerald-600" />
								Dia {dayPlan.day}
							</h3>
						</div>

						<Select
							label="Almoço"
							placeholder="Pular"
							value={dayPlan.lunch}
							options={dishes}
							onChange={(val) => handleDayChange(idx, "lunch", val)}
						/>
						<Select
							label="Jantar"
							placeholder="Pular"
							value={dayPlan.dinner}
							options={dishes}
							onChange={(val) => handleDayChange(idx, "dinner", val)}
						/>
					</Card>
				))}
			</div>
		</div>
	);

	const renderDishesManager = () => (
		<div className="space-y-6 fade-in">
			<SummaryTable
				title="Resumo do Cardápio"
				columns={[
					{ label: "Pratos Criados", key: "totalPratos" },
					{ label: "Combinações (Saladas/Frutas)", key: "totalCombinacoes" },
					{ label: "Ingredientes Base", key: "ingredientesCadastrados" },
				]}
				data={dashboardData.dishesSummary}
			/>

			<div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
				<h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
					<Utensils className="text-emerald-600" /> Pratos Principais
				</h2>
				<button
					onClick={addEmptyDish}
					className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-sm rounded-lg font-bold flex items-center gap-1"
				>
					<Plus size={16} /> Novo Prato
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{dishes.map((dish) => (
					<Card
						key={dish.id}
						className="flex flex-col gap-3 border-l-4 border-l-emerald-500 relative group"
					>
						<button
							onClick={() => removeDish(dish.id)}
							className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
						>
							<Trash2 size={16} />
						</button>
						<input
							value={dish.name}
							onChange={(e) =>
								handleDishChange(dish.id, "name", e.target.value)
							}
							className="font-bold text-base text-slate-800 border-b border-transparent hover:border-slate-300 focus:border-emerald-500 outline-none w-[90%] pb-1 bg-transparent transition-colors"
						/>

						<div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
							<span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">
								Ingredientes Base & Preparo
							</span>
							<ul className="space-y-1">
								{dish.ingredients.map((ing) => {
									const data = ingredients.find(
										(i) => i.id === ing.ingredientId
									);
									if (!data) return null;
									return (
										<li
											key={ing.ingredientId}
											className="text-sm flex items-center justify-between text-slate-700"
										>
											<div className="flex items-center gap-2">
												<span>{data.name}</span>
												<span className="text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-500">
													{data.prep}
												</span>
											</div>
											<span className="text-slate-400 text-xs font-medium">
												{ing.qty}
												{data.unit}
											</span>
										</li>
									);
								})}
							</ul>
						</div>

						{dish.combinations.length > 0 && (
							<div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 border-l-4 border-l-emerald-400">
								<span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1">
									<Layers size={12} /> Acompanhamentos (Saladas/Frutas)
								</span>
								<div className="flex flex-wrap gap-2 mt-1">
									{dish.combinations.map((cId) => {
										const data = combinations.find((c) => c.id === cId);
										if (!data) return null;
										const Icon = data.type === "fruta" ? Apple : Carrot;
										return (
											<div
												key={cId}
												className="bg-white border border-emerald-200 px-2 py-1 rounded text-xs font-medium text-emerald-800 flex items-center gap-1.5 shadow-sm"
											>
												<Icon size={12} className="text-emerald-500" />
												{data.name}
											</div>
										);
									})}
								</div>
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);

	const renderCombinationsManager = () => (
		<div className="space-y-6 fade-in">
			<SummaryTable
				title="Resumo de Combinações"
				columns={[
					{ label: "Total", key: "total" },
					{ label: "Tipos", key: "tipos" },
				]}
				data={{ total: combinations.length, tipos: "Saladas, Frutas" }}
			/>
			<div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
				<h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
					<Layers className="text-emerald-600" /> Gerenciar Combinações
				</h2>
				<button
					onClick={addEmptyCombination}
					className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 text-sm rounded-lg font-bold flex items-center gap-1"
				>
					<Plus size={16} /> Nova Combinação
				</button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{combinations.map((combo, idx) => (
					<Card
						key={combo.id}
						className="relative group border-l-4 border-l-slate-300 hover:border-l-emerald-400 transition-colors"
					>
						<button
							onClick={() => removeCombination(combo.id)}
							className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100"
						>
							<Trash2 size={16} />
						</button>
						<div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 w-[90%]">
							{combo.type === "fruta" ? (
								<Apple size={18} className="text-orange-500" />
							) : (
								<Carrot size={18} className="text-emerald-500" />
							)}
							<input
								value={combo.name}
								onChange={(e) => {
									const newName = e.target.value;
									setCombinations(
										combinations.map((c, i) =>
											i === idx ? { ...c, name: newName } : c
										)
									);
								}}
								className="font-bold text-slate-800 border-b border-transparent hover:border-slate-300 focus:border-emerald-500 outline-none w-full bg-transparent"
							/>
						</div>
						<ul className="space-y-2 mt-2">
							{combo.items.map((item) => {
								const data = ingredients.find(
									(i) => i.id === item.ingredientId
								);
								if (!data) return null;
								return (
									<li
										key={item.ingredientId}
										className="text-sm text-slate-700 flex justify-between items-center bg-slate-50 px-2 py-1.5 rounded border border-slate-100"
									>
										<span className="flex items-center gap-1">
											<div className="w-1 h-1 rounded-full bg-slate-400"></div>
											{data.name}
										</span>
										<span className="font-bold text-slate-500 text-xs bg-white border border-slate-200 px-1 rounded">
											{item.qty} {data.unit}
										</span>
									</li>
								);
							})}
						</ul>
					</Card>
				))}
			</div>
		</div>
	);

	const TABS: { id: string; label: string; icon: LucideIcon }[] = [
		{ id: "overview", label: "Visão Geral", icon: LayoutDashboard },
		{ id: "planner", label: "Editar Dias", icon: CalendarDays },
		{ id: "dishes", label: "Pratos Base", icon: Utensils },
		{ id: "combos", label: "Saladas/Frutas", icon: Layers },
	];

	return (
		<div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-emerald-200 pb-12">
			<style>{`
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

			{/* Header */}
			<header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
				<div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-3">
					<div className="flex items-center gap-3">
						<div className="bg-emerald-600 p-2.5 rounded-xl shadow-inner border border-emerald-500">
							<Carrot className="text-white" size={22} strokeWidth={2.5} />
						</div>
						<div>
							<h1 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
								DietPlanner Pro
							</h1>
							<p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
								Dashboard do Cardápio
							</p>
						</div>
					</div>

					<nav className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-200 overflow-x-auto w-full md:w-auto shadow-inner">
						{TABS.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
									activeTab === tab.id
										? "bg-white text-emerald-700 shadow border border-slate-200/60 scale-105"
										: "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 border border-transparent"
								}`}
							>
								<tab.icon
									size={15}
									strokeWidth={activeTab === tab.id ? 2.5 : 2}
								/>
								<span>{tab.label}</span>
							</button>
						))}
					</nav>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 py-8">
				{activeTab === "overview" && renderOverview()}
				{activeTab === "planner" && renderPlanner()}
				{activeTab === "dishes" && renderDishesManager()}
				{activeTab === "combos" && renderCombinationsManager()}
			</main>
		</div>
	);
}

