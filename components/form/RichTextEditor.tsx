import {
    BoldExtension,
    HeadingExtension,
    ItalicExtension,
    UnderlineExtension,
    BulletListExtension,
    ListItemExtension,
    ListItemSharedExtension,
    OrderedListExtension
} from "remirror/extensions";
import {
    useRemirror,
    ComponentItem,
    Remirror,
    ThemeProvider,
    Toolbar
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import type { ToolbarItemUnion } from "@remirror/react";
import { prosemirrorNodeToHtml } from "remirror";



interface RichTextEditorProps {
    text: string;
    setValue: (value: string) => any;
};


const extensions = () => [
    new HeadingExtension(),
    new BoldExtension({}),
    new ItalicExtension(),
    new UnderlineExtension(),
    new BulletListExtension(),
    new ListItemExtension(),
    new ListItemSharedExtension(),
    new OrderedListExtension()
];

const toolbarItems: ToolbarItemUnion[] = [
    {
        type: ComponentItem.ToolbarGroup,
        label: "History",
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: "undo", display: "icon" },
            { type: ComponentItem.ToolbarCommandButton, commandName: "redo", display: "icon" },
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Simple Formatting",
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: "toggleBold", display: "icon" },
            { type: ComponentItem.ToolbarCommandButton, commandName: "toggleItalic", display: "icon" },
            { type: ComponentItem.ToolbarCommandButton, commandName: "toggleUnderline", display: "icon" },
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "List Formatting",
        items: [
            { type: ComponentItem.ToolbarCommandButton, commandName: "toggleBulletList", display: "icon" },
            { type: ComponentItem.ToolbarCommandButton, commandName: "toggleOrderedList", display: "icon" },
        ],
        separator: "end",
    },
    {
        type: ComponentItem.ToolbarGroup,
        label: "Heading Formatting",
        items: [
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: { level: 1 },
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: { level: 2 },
            },
            {
                type: ComponentItem.ToolbarCommandButton,
                commandName: "toggleHeading",
                display: "icon",
                attrs: { level: 3 },
            },
        ],
        separator: "none",
    },
    {
        type: ComponentItem.ToolbarMenu,
        label: "Headings",
        items: [
            {
                type: ComponentItem.MenuGroup,
                role: "radio",
                items: [
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 1 },
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 2 },
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 3 },
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 4 },
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 5 },
                    },
                    {
                        type: ComponentItem.MenuCommandPane,
                        commandName: "toggleHeading",
                        attrs: { level: 6 },
                    },
                ],
            },
        ],
    },
];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ text, setValue }) => {
    const { manager, state, setState } = useRemirror({
        extensions,
        content: text,
        selection: "end",
        stringHandler: "html"
    });

    return (
        <AllStyledComponent>
            <ThemeProvider>
                <Remirror manager={manager}
                    state={state}
                    onChange={(parameter) => {
                        // Update the state to the latest value.
                        setState(parameter.state);
                        setValue(prosemirrorNodeToHtml(parameter.state.doc));
                    }} autoFocus autoRender="end">
                    <Toolbar items={toolbarItems} refocusEditor label="Top Toolbar" />
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
};