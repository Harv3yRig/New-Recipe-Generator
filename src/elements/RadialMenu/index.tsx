import './index.scss';

interface RadialMenuProps {
    inputs: string[];
    onSelectionChange?: (selected: string[]) => void;
}

export const RadialMenu = ({ inputs, onSelectionChange }: RadialMenuProps) => {
    const handleCheckboxChange = () => {
        if (!onSelectionChange) return;
        const selected = inputs.filter((_, index) => {
            const checkbox = document.getElementById(inputs[index]) as HTMLInputElement;
            return checkbox?.checked;
        });
        onSelectionChange(selected);
    };

    return (
        <div className='radial-menu'>
            {inputs.map((input, index) => (
                <div className={`radial-menu__item item-${index}`} key={index}>
                    <input 
                        type='checkbox' 
                        className='radial-menu__checkbox' 
                        id={input} 
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={input} className='radial-menu__label'>{input}</label>
                </div>
            ))}
        </div>
    )
}