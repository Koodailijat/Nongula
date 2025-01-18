import { useState } from 'react';

export interface TextfieldProps {
    /** Text to show **/
    children: string;
    /** Text color, defaults to primary **/
    mode?: 'primary' | 'secondary';
    /** Text size, defaults to medium **/
    size?: 'small' | 'medium' | 'large';
    /** Side of the icon **/
    iconSide?: 'left' | 'right';
    /** URL of the icon image **/
    icon?: string;
}

/** Primary UI component for text */
export const Textfield = ({
    children,
    size = 'medium',
    mode = 'primary',
    iconSide = 'left',
    icon = '../../../search_icon_textfield.PNG',
    ...props
}: TextfieldProps) => {
    const [text, setText] = useState(children);

    return (
        <div className="textfield-wrapper">
            {iconSide === 'left' && icon && (
                <div className="textfield-icon">
                    <img
                        src={icon}
                        alt="Icon"
                        className="textfield-icon"
                        style={{ width: '20px' }}
                    />
                </div>
            )}
            <div className="textfield-content">
                <span
                    id={'textfield-span'}
                    className={['text', `text--${size}`, `text--${mode}`].join(
                        ' '
                    )}
                    {...props}
                    contentEditable
                    onInput={(e) =>
                        setText((e.target as HTMLElement).innerText)
                    }>
                    {text}
                </span>
            </div>
            {iconSide === 'right' && icon && (
                <div className="textfield-icon">
                    <img src={icon} alt="Icon" className="textfield-icon" />
                </div>
            )}
        </div>
    );
};
