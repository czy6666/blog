export function contentRemove(content: string): string {
    return content.length > 97
        ? content
              .replace(/<\/?.+?>/g, '')
              .replaceAll('\\n', '')
              .substring(0, 97) + ' . . . '
        : content.replace(/<\/?.+?>/g, '')
}
