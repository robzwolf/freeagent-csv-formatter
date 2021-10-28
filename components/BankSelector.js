import Select from "react-select";
import formatters from "./formatters/formatters";

export default function BankSelector({bank, handleBankChange}) {
    const handleChange = (option, type) => {
        console.log("selected bank", option, type);
        if (type.action === "select-option") {
            handleBankChange(option);
        }
    }

    return (
        <>
            <div className="bank-selector">
                <Select
                    // menuIsOpen={true} // Uncomment when debugging styles
                    options={[
                        ...Object.keys(formatters).map(key => ({
                            value: formatters[key].formatter,
                            label: formatters[key].prettyName
                        }))
                    ]}
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            boxShadow: '0 0 0 1px var(--fcf-blue)',
                            '&:hover': {
                                borderColor: 'var(--fcf-blue)'
                            }
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            background: state.isSelected ? 'var(--fcf-blue)' : (state.isFocused ? 'var(--fcf-pale-blue)' : provided.background),
                        }),
                        noOptionsMessage: (provided, state) => ({
                            ...provided,
                            cursor: 'default'
                        })
                    }}
                    autoFocus={true}
                    value={bank}
                    onChange={handleChange}
                    width={500}
                    instanceId="bank"
                    placeholder="Select your bank..."
                />
            </div>
            <style jsx>{`
                .bank-selector {
                    width: min(360px, 100vw);
                }
            `}</style>
        </>
    );
}
