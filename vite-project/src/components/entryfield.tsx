import "../styles/entryfield.css"

interface EntryFieldRequirements {
    formID:string
    formname: string;
    requirethiselement: boolean;
}

function EntryField({formID, formname, requirethiselement }: EntryFieldRequirements) {
    return (
            <div className="form-text-box">
                <label htmlFor={formID}>
                    {formname}
                    {requirethiselement ? "*" : ""}
                </label>
                <input type="text" id={formID} required={requirethiselement} />
            </div>
    );
}

export default EntryField;
