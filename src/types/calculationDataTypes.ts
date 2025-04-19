export type CalculationsSection = {
    description: string;
};

export type MarginOfSafetySection = CalculationsSection & {
    formula: string;
};

export type CalculationsAnalysisType = {
    mainDescription: string;
    sections: {
        marginOfSafetyDetailed: MarginOfSafetySection;
        fundamentals: CalculationsSection;
        consistency: CalculationsSection;
        moat: CalculationsSection;
        management: CalculationsSection;
    };
};

export type CalculationsDataType = {
    buffett: CalculationsAnalysisType;
    graham: CalculationsAnalysisType;
    burry: CalculationsAnalysisType;
};
