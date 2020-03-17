import React, { useState } from "react";
import { Stack } from "office-ui-fabric-react";
import { IconButton } from "office-ui-fabric-react/lib/Button";
import { Axes, Props as AxesProps } from "./Axes";
import { Gcode } from "./Gcode";

export interface Props extends AxesProps {}

export const MachineCtrl: React.FunctionComponent<Props> = props => {
    const [opened, setOpened] = useState(true);
    return (
        <div>
            <Stack>
                <IconButton
                    iconProps={{ iconName: opened ? "ChevronRightSmall" : "ChevronLeftSmall" }}
                    title={opened ? "Close" : "Open"}
                    onClick={() => setOpened(!opened)}
                />
                {opened ? <Axes {...props} /> : <div></div>}
                {opened ? <Gcode /> : <div></div>}
            </Stack>
        </div>
    );
};
