type CssSelector = string;
type TestId = string;

export function selectorForTestId(id: TestId): CssSelector {
    return `[data-testid='${id}']`;
}

export const mfeSelectors: [string, string][] = [
    ['rows', 'table > tbody > tr'],
];