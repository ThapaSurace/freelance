export default function ErrorMessage({
  message,
}: {
  message: string | undefined;
}) {
  return <p className="text-xs text-red-700 font-medium">{message}*</p>;
}
