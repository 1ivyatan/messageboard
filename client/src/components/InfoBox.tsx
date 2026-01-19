export default function InfoBox(props: { text: String }) {
    return (
        <div className="mb-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p>{props.text}</p>
        </div>
    );
}