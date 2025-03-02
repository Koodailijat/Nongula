import { Button } from 'react-aria-components';
import { Fragment, ReactNode, useState } from 'react';

interface SegmentedButtonProps {
    children: ReactNode;
    id: number;
    selected: number;
    setSelected: (id: number) => void;
    first?: boolean;
    last?: boolean;
}

function SegmentedButton({
    children,
    id,
    selected,
    setSelected,
    first,
    last,
}: SegmentedButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    let backgroundColor = '';
    let borderRadiusStyling = '';

    if (selected !== id) {
        backgroundColor = isHovered ? '#efefef ' : '#ffffff ';
    }

    if (first) {
        borderRadiusStyling = '10px 0 0 10px';
    }

    if (last) {
        borderRadiusStyling = '0 10px 10px 0 ';
    }

    return (
        <Button
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="segmented-control__segment"
            style={{
                backgroundColor: selected === id ? ' #519a58' : backgroundColor,
                color: selected === id ? '#FFFFFF' : '#000000',
                borderRadius: borderRadiusStyling,
            }}
            onPress={() => setSelected(id)}>
            {children}
        </Button>
    );
}

function Divider() {
    return <div className="segmented-control__divider"></div>;
}

interface SegmentedControlProps {
    selected: number;
    setSelected: (id: number) => void;
    segments: string[];
}

export function SegmentedControl({
    segments,
    selected,
    setSelected,
}: SegmentedControlProps) {
    let divider = false;
    return (
        <div className="segmented-control">
            {segments.map((segment, idx) => {
                let first = false;
                let last = false;
                if (idx === 0) {
                    first = true;
                } else if (idx === segments.length - 1) {
                    last = true;
                } else {
                    divider = true;
                }
                return (
                    <Fragment key={idx}>
                        <SegmentedButton
                            id={idx}
                            selected={selected}
                            setSelected={setSelected}
                            first={first}
                            last={last}>
                            {segment}
                        </SegmentedButton>
                        {divider && <Divider />}
                    </Fragment>
                );
            })}
        </div>
    );
}
