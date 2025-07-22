import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document, BLOCKS, INLINES, Block, Inline, Text } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';

interface RichTextRendererProps {
  document: Document;
}

// Opciones de renderizado para el Rich Text
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { file, title } = node.data.target.fields;
      return (
        <div className="my-8">
          <Image
            src={`https:${file.url}`}
            alt={title || ''}
            width={file.details.image.width}
            height={file.details.image.height}
            className="rounded-lg w-full h-auto"
          />
        </div>
      );
    },
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => {
      const text = (node.content[0] as Text)?.value || '';
      const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      return (
        <h2 id={id} className="text-3xl font-bold mt-20 mb-10 leading-tight tracking-tight">
          {children}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => {
      const text = (node.content[0] as Text)?.value || '';
      const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      return (
        <h3 id={id} className="text-xl font-bold mt-10 mb-8 leading-tight tracking-tight">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => {
      const text = (node.content[0] as Text)?.value || '';
      const id = `heading-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
      return (
        <h4 id={id} className="text-lg font-semibold text-neutral-500 mt-10 mb-6">
          {children}
        </h4>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <p className="text-base leading-relaxed mb-2">
        {children}
      </p>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ul className="text-base text-neutral-700 leading-relaxed mb-8 list-disc list-inside space-y-3">
        {children}
      </ul>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <ol className="text-base text-neutral-700 leading-relaxed mb-8 list-decimal list-inside space-y-3">
        {children}
      </ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => (
      <li className="mb-3 leading-relaxed">{children}</li>
    ),
    [BLOCKS.TABLE]: (node: Block | Inline, children: React.ReactNode) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse border border-neutral-200">
          {children}
        </table>
      </div>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <th className="border border-neutral-200 bg-white px-4 py-3 text-left text-xs font-medium text-neutral-900 tracking-wider">
        {children}
      </th>
    ),
    [BLOCKS.TABLE_CELL]: (node: Block | Inline, children: React.ReactNode) => (
      <td className="border border-neutral-200 px-4 py-3 text-xs text-neutral-700">
        {children}
      </td>
    ),
    [BLOCKS.TABLE_ROW]: (node: Block | Inline, children: React.ReactNode) => (
      <tr>
        {children}
      </tr>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <Link
        href={node.data.uri}
        className="text-blue-600 font-medium underline decoration-2 underline-offset-2 hover:text-blue-800 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    ),
  },
  renderMark: {
    bold: (text: React.ReactNode) => <strong className="font-semibold text-black-950">{text}</strong>,
    italic: (text: React.ReactNode) => <em className="italic">{text}</em>,
    underline: (text: React.ReactNode) => <u className="underline">{text}</u>,
    code: (text: React.ReactNode) => (
      <code className="bg-neutral-100 text-neutral-800 px-2 py-1 rounded text-sm font-mono">
        {text}
      </code>
    ),
  },
};

export default function RichTextRenderer({ document }: RichTextRendererProps) {
  return (
    <div className="prose prose-lg prose-neutral max-w-none">
      {documentToReactComponents(document, renderOptions)}
    </div>
  );
}
