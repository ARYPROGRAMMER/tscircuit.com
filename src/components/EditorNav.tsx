import {
  ChevronDown,
  Copy,
  Download,
  Edit2,
  Eye,
  Maximize2,
  Package,
  Share,
  Share2,
  Sidebar,
  SidebarClose,
  Save,
} from "lucide-react"
import { Link } from "wouter"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OpenInNewWindowIcon } from "@radix-ui/react-icons"
import { encodeTextToUrlHash } from "@/lib/encodeTextToUrlHash"
import { Snippet } from "fake-snippets-api/lib/db/schema"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { DownloadButtonAndMenu } from "./DownloadButtonAndMenu"
import { TypeBadge } from "./TypeBadge"

export default function EditorNav({
  snippet,
  code,
  hasUnsavedChanges,
  onSave,
  isSaving,
}: {
  snippet: Snippet
  code: string
  hasUnsavedChanges: boolean
  isSaving: boolean
  onSave: () => void
}) {
  return (
    <nav className="flex items-center justify-between px-2 py-3 border-b border-gray-200 bg-white text-sm border-t">
      <div className="flex items-center space-x-1">
        {/* <span className="text-base font-semibold">»</span> */}
        <span className="text-md font-semibold">
          {snippet.full_snippet_name}
        </span>
        <Link href={`/${snippet.full_snippet_name}`}>
          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
            <OpenInNewWindowIcon className="h-3 w-3 text-gray-700" />
          </Button>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className={"h-6 px-2 text-xs"}
          onClick={onSave}
        >
          <Save className="mr-1 h-3 w-3" />
          Save
        </Button>
        {isSaving && (
          <div className="animate-fadeIn bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
            <svg
              className="animate-spin h-3 w-3 mr-2 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </div>
        )}
        {hasUnsavedChanges && !isSaving && (
          <div className="animate-fadeIn bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
            unsaved changes
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {snippet && <TypeBadge type={snippet.type} />}
        <DownloadButtonAndMenu />
        <Button
          variant="outline"
          size="sm"
          className="h-6 px-2 text-xs"
          onClick={() => {
            const url = encodeTextToUrlHash(code)
            navigator.clipboard.writeText(url)
            alert("URL copied to clipboard!")
          }}
        >
          <Share className="mr-1 h-3 w-3" />
          Copy URL
        </Button>
        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
          <Eye className="mr-1 h-3 w-3" />
          Public
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Sidebar className="h-3 w-3" />
        </Button>
      </div>
    </nav>
  )
}
