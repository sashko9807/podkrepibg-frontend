import { useState } from 'react'

type ReadMore = {
  [key: string]: boolean
}

export function useShowMoreContent() {
  const [isExpanded, setIsExpanded] = useState<ReadMore>({})
  const [isExpandable, setIsExpandable] = useState<ReadMore>({})

  const expandContent = (articleId: string): void => {
    setIsExpanded((prevState: ReadMore): ReadMore => {
      return {
        ...prevState,
        [articleId]: !isExpanded[articleId],
      }
    })
  }

  const handleIsExpandable = (articleId: string, isExpandable: boolean) => {
    setIsExpandable((prevState) => {
      return {
        ...prevState,
        [articleId]: isExpandable,
      }
    })
  }

  return [isExpanded, expandContent, isExpandable, handleIsExpandable] as const
}
