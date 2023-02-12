import { useState } from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  id: string;
  copyText: string;
  children: React.ReactNode;
};

const CopyButton = ({ id, copyText, children }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const cId = copied ? "copied-" + id : id;

  return (
    <>
      <span
        id={cId}
        onClick={copyToClipboard}
        className="mt-2 inline-flex cursor-pointer items-center self-end rounded-lg border border-gray-600 bg-gray-800 px-2 py-1 text-center text-sm font-medium text-white hover:border-gray-700 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
      >
        {children}
      </span>

      <Tooltip anchorId={cId} style={{ backgroundColor: "#334155" }}>
        {copied ? "Copied!" : `Copy '${copyText}'`}
      </Tooltip>
    </>
  );
};

export default CopyButton;
