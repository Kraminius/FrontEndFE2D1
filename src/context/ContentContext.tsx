import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { ContentFlow } from "../components/flowingContent/FlowingContent.tsx";

const initialContent: ContentFlow[] = [];

export const ContentContext = createContext(initialContent);
export const ContentDispatchContext = createContext<Dispatch<Action>>(() => {});

interface ContentProviderProps {
  children: ReactNode;
}

export function ContentProvider({ children }: ContentProviderProps) {
  const [tasks, dispatch] = useReducer(contentReducer, initialContent);

  return (
    <ContentContext.Provider value={tasks}>
      <ContentDispatchContext.Provider value={dispatch}>
        {children}
      </ContentDispatchContext.Provider>
    </ContentContext.Provider>
  );
}

export function useContentContext() {
  return useContext(ContentContext);
}

export function useContentDispatchContext() {
  return useContext(ContentDispatchContext);
}

type Action = { type: "CHANGE_CONTENT"; payload: ContentFlow };

function contentReducer(state: ContentFlow[], action: Action): ContentFlow[] {
  switch (action.type) {
    case "CHANGE_CONTENT":
      return [...state, action.payload];
    default:
      throw new Error(`Unknown action: ${(action as any).type}`);
  }
}
