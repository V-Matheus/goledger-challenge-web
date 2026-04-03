export type ActionState = {
	success: boolean;
	errors?: string[];
	fieldErrors?: Record<string, string[]>;
	data?: Record<string, string>;
};

export const initialActionState: ActionState = {
	success: false,
};
