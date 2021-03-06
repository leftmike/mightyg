import React, { useState } from "react";
import { ChoiceGroup, IChoiceGroupOption } from "office-ui-fabric-react/lib/ChoiceGroup";
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/index";
import { IconButton } from "office-ui-fabric-react/lib/Button";

import { CtrlWebSocket } from "../util/CtrlWebSocket";

const unitsOptions: IChoiceGroupOption[] = [
    { key: "mm", text: "mm" },
    { key: "in", text: "in" }
];

export interface Props {
    units: string;
    onUnitsChange: (units: string) => void;
}

const mmStepDefault = "1";
const mmStepOptions: IComboBoxOption[] = [
    { key: "10", text: "10" },
    { key: "1", text: "1" },
    { key: "0.1", text: "0.1" },
    { key: "0.01", text: "0.01" }
];

const inStepDefault = "0.1";
const inStepOptions: IComboBoxOption[] = [
    { key: "1", text: "1" },
    { key: "0.1", text: "0.1" },
    { key: "0.01", text: "0.01" },
    { key: "0.001", text: "0.001" }
];

const deltaClick = (deltaX: number, deltaY: number, deltaZ: number) => {
    CtrlWebSocket.sendMsgDelta({
        DeltaX: deltaX,
        DeltaY: deltaY,
        DeltaZ: deltaZ
    });
};

export const PositionCtrl: React.FunctionComponent<Props> = props => {
    let stepOptions: IComboBoxOption[];
    let stepDefault: string;
    if (props.units === "mm") {
        stepOptions = mmStepOptions;
        stepDefault = mmStepDefault;
    } else {
        stepOptions = inStepOptions;
        stepDefault = inStepDefault;
    }

    let [step, setStep] = useState(Number(stepDefault));

    if (stepOptions.findIndex(val => Number(val.key) === step) === -1) {
        step = Number(stepDefault);
        setStep(step);
    }

    const style = { border: "1px solid gray", padding: 3 };
    return (
        <div>
            <table>
                <tr>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(-90deg)" } }}
                            title="-X +Y"
                            onClick={() => deltaClick(-1 * step, 1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Up" }}
                            title="+Y"
                            onClick={() => deltaClick(0, 1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            title="+X +Y"
                            onClick={() => deltaClick(1 * step, 1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Up" }}
                            title="+Z"
                            onClick={() => deltaClick(0, 0, 1 * step)}
                        />
                    </td>
                </tr>
                <tr>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Back" }}
                            title="-X"
                            onClick={() => deltaClick(-1 * step, 0, 0)}
                        />
                    </td>
                    <td style={{ textAlign: "center", ...style }}>XY</td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Forward" }}
                            title="+X"
                            onClick={() => deltaClick(1 * step, 0, 0)}
                        />
                    </td>
                    <td style={{ textAlign: "center", ...style }}>Z</td>
                </tr>
                <tr>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(180deg)" } }}
                            title="-X -Y"
                            onClick={() => deltaClick(-1 * step, -1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Down" }}
                            title="-Y"
                            onClick={() => deltaClick(0, -1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "ArrowUpRight" }}
                            styles={{ root: { transform: "rotate(90deg)" } }}
                            title="+X -Y"
                            onClick={() => deltaClick(1 * step, -1 * step, 0)}
                        />
                    </td>
                    <td style={style}>
                        <IconButton
                            iconProps={{ iconName: "Down" }}
                            title="-Z"
                            onClick={() => deltaClick(0, 0, -1 * step)}
                        />
                    </td>
                </tr>
            </table>
            <ChoiceGroup
                selectedKey={props.units}
                options={unitsOptions}
                label="Units"
                onChange={(_event, option) => {
                    if (option) {
                        props.onUnitsChange(option.key);
                    }
                }}
                style={{ margin: 2 }}
            />
            <ComboBox
                options={stepOptions}
                label={"Delta Step (" + props.units + ")"}
                text={String(step)}
                onChange={(_event, option) => {
                    if (option) {
                        setStep(Number(option.key));
                    }
                }}
                style={{ margin: 2 }}
            />
        </div>
    );
};
