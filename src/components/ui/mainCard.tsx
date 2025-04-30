import { Card } from "./card"

export const MainCard = ({title, subTitle, Icon}: {title: string, subTitle: string, Icon: React.ComponentType<{className: string}>}) => {
    return <Card className="flex items-center col-span-2">
        <div className="mr-2">
            <Icon className="w-10 h-10" />
        </div>
        <div>
            <div className="text-lg font-medium">{title}</div>
            <div className="text-2xl font-bold">{subTitle}</div>
        </div>
    </Card>
}