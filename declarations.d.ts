
type HorizontalTimeline = React.FC<{
    values: string[],
    indexClick: (index: number) => any,
    index: number,
    getLabel?: (date: Date) => string,
    minEventPadding?: number,
    maxEventPadding?: number,
    linePadding?: number,
    labelWidth?: number,
    fillingMotion?: { stiffness: number, damping: number },
    slidingMotion?: { stiffness: number, damping: number },
    styles?: { background: string, foreground: string, outline: string },
    isTouchEnabled?: boolean,
    isKeyboardEnabled?: boolean,
    isOpenBeginning?: boolean,
    isOpenEnding?: boolean,
}>;

declare module "react-horizontal-timeline" {
    const HorizontalTimeline: HorizontalTimeline;

    export default HorizontalTimeline;
};