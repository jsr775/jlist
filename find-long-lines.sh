#!/bin/bash

# Script to find lines longer than 120 characters in source files
echo "🔍 Finding lines longer than 120 characters in source files..."
echo ""

find components hooks lib app -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" | while read file; do
    long_lines=$(grep -n ".{121,}" "$file" 2>/dev/null | head -3)
    if [ ! -z "$long_lines" ]; then
        echo "📄 $file:"
        echo "$long_lines" | while read line; do
            line_num=$(echo "$line" | cut -d: -f1)
            content=$(echo "$line" | cut -d: -f2- | cut -c1-100)
            echo "  Line $line_num: $content..."
        done
        echo ""
    fi
done

echo "💡 To fix these, you can manually break long strings using string concatenation:"
echo "   'very long string' + 'continuation'"
echo "   or template literals with line breaks."