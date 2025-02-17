import { Heading } from '../../../stories/components/Heading/Heading.tsx';
import { TextField } from '../../../stories/components/TextField/TextField.tsx';
import { RadioGroup } from '../../../stories/components/RadioGroup/RadioGroup.tsx';
import { Radio } from '../../../stories/components/RadioGroup/Radio.tsx';

export function SetupRoute() {
    return (
        <div className="setup">
            <div className="setup__header">
                <Heading level={1}>Setup route</Heading>
            </div>
            <div className="setup__content">
                <TextField label="Age" />
                <RadioGroup label="Gender">
                    <Radio value="female">Female</Radio>
                    <Radio value="male">Male</Radio>
                </RadioGroup>
            </div>
        </div>
    );
}
