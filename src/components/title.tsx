
interface TitleProps {
    text: string;
    className?: string;
    onClick?: () => void;
};

export default function Title({ text }: TitleProps) {

    return (
        <>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {text}
            </h1>
        </>

    )

}