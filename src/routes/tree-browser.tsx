import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/tree-browser")({
  component: TreeBrowser,
});

type Node = {
  children: Node[];
  text: string;
  type: "folder" | "file";
};

function TreeBrowser() {
  const [root, setRoot] = useState<Node>({
    children: [
      {
        children: [],
        text: "file1.txt",
        type: "file",
      },
      {
        children: [
          {
            children: [],
            text: "nested-file1.js",
            type: "file",
          },
          {
            children: [
              {
                children: [],
                text: "deep-file.md",
                type: "file",
              },
            ],
            text: "nested-folder",
            type: "folder",
          },
        ],
        text: "documents",
        type: "folder",
      },
      {
        children: [
          {
            children: [],
            text: "image1.png",
            type: "file",
          },
          {
            children: [],
            text: "image2.jpg",
            type: "file",
          },
        ],
        text: "images",
        type: "folder",
      },
      {
        children: [],
        text: "README.md",
        type: "file",
      },
    ],
    text: "root",
    type: "folder",
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
            </svg>
            File Explorer
          </h1>
        </div>
        <div className="p-6 max-h-96 overflow-y-auto">
          <Node node={root} />
        </div>
      </div>
    </div>
  );
}

function Node({ node }: { node: Node }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="select-none">
      <div className="flex items-center gap-2 group">
        {node.type === "folder" ? (
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 group-hover:bg-gray-50 w-full text-left"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center justify-center w-5 h-5">
              <svg
                className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isExpanded ? "rotate-90" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className={`w-5 h-5 transition-colors duration-200 ${isExpanded ? "text-blue-600" : "text-yellow-600"}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {isExpanded ? (
                  <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                ) : (
                  <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
                )}
              </svg>
              <span className="font-medium text-gray-800 group-hover:text-gray-900">{node.text}</span>
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3 py-2 ml-5">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-700 hover:text-gray-900 transition-colors duration-150">{node.text}</span>
          </div>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-6 border-l-2 border-gray-200 pl-4 mt-1">
          {node.children.map((child, index) => (
            <div key={child.text} className={index === node.children.length - 1 ? "pb-2" : ""}>
              <Node node={child} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
