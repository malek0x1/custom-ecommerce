
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Radio = ({ gateways, setFormData, name = "chosenPaymentGateway" }) => {
    return (
        <RadioGroup defaultValue="comfortable"
            onValueChange={val => { setFormData(prev => ({ ...prev, [name]: val })) }}
        >
            {gateways.map(item => (
                <div key={item.id} className="flex items-center space-x-2  border rounded">
                    <RadioGroupItem className="ml-2" value={item} id={`${item.id}`} />
                    <Label className="p-4 w-full h-full" htmlFor={`${item.id}`}>{item.name}</Label>
                </div>
            ))}
        </RadioGroup>
    )
}

export default Radio