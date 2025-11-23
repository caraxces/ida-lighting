import Image from 'next/image'
import { ContentBlock, ComparisonTableData } from '@/src/types/blog'

interface ContentBlocksDisplayProps {
  blocks: ContentBlock[]
}

export function ContentBlocksDisplay({ blocks }: ContentBlocksDisplayProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-12 mt-12">
      {blocks.map((block) => (
        <div key={block.id}>
          {block.block_type === 'image_content' && (
            <ImageContentBlock block={block} />
          )}
          
          {block.block_type === 'comparison_table' && (
            <ComparisonTableBlock block={block} />
          )}
          
          {block.block_type === 'text_content' && (
            <TextContentBlock block={block} />
          )}
        </div>
      ))}
    </div>
  )
}

// Image Content Block (Trái/Phải)
function ImageContentBlock({ block }: { block: ContentBlock }) {
  const isLeft = block.image_position === 'left' || block.image_position === undefined

  if (!block.image_url && !block.content) {
    return null
  }

  return (
    <div className={`grid md:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'md:grid-flow-dense'}`}>
      {/* Image */}
      {block.image_url && (
        <div className={isLeft ? 'md:col-start-1' : 'md:col-start-2'}>
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-800">
            <Image
              src={block.image_url}
              alt={block.heading || 'Content image'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={isLeft ? 'md:col-start-2' : 'md:col-start-1'}>
        {block.heading && (
          <h3 className="text-2xl font-bold mb-4 text-white">{block.heading}</h3>
        )}

        {block.content && (
          <div 
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )}
      </div>
    </div>
  )
}

// Comparison Table Block
function ComparisonTableBlock({ block }: { block: ContentBlock }) {
  if (!block.table_data) return null

  const tableData = block.table_data as ComparisonTableData

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900">
      {tableData.title && (
        <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
          <h3 className="text-xl font-bold text-white">{tableData.title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/50">
              <th className="px-6 py-3 text-left font-semibold text-white">Đặc điểm</th>
              {tableData.columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3 text-left font-semibold text-white">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-t border-gray-800">
                <td className="px-6 py-3 font-medium text-gray-300">{row.label}</td>
                {row.values.map((value, valIdx) => (
                  <td key={valIdx} className="px-6 py-3 text-gray-300">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Text Content Block
function TextContentBlock({ block }: { block: ContentBlock }) {
  if (!block.content) return null

  return (
    <div>
      {block.heading && (
        <h3 className="text-2xl font-bold mb-4 text-white">{block.heading}</h3>
      )}

      <div 
        className="prose prose-invert prose-lg max-w-none text-gray-300"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  )
}

