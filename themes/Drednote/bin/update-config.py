import argparse

popupHeight = '432'
popupWidth = '432'

parser = argparse.ArgumentParser()
parser.add_argument('-f', '--file')
args = parser.parse_args()

def find_popup(text: str, size: str):
    global i, line
    found_popup_height = False
    for i, line in enumerate(lines_between):
        if ('%s=' % text) in line:
            found_popup_height = True
            lines_between[i] = '%s=%s\n' % (text, size)
            break
    if not found_popup_height:
        lines_between.append('%s=%s\n' % (text, size))


with open(args.file, mode='r') as file:
    lines = file.readlines()

start_index = None
target_index = None
end_index = None
target_line = 'plugin=org.kde.plasma.private.systemtray'

for i, line in enumerate(lines):
    if '[Containments]' in line:
        if target_index is None:
            start_index = i + 1
        elif end_index is None:
            end_index = i
            break
    elif line.strip() == target_line:
        target_index = i

if start_index is None:
    start_index = 0
if end_index is None:
    end_index = len(lines) - 1

if target_index is not None:
    lines_between = lines[start_index:end_index]
    find_popup('popupHeight', popupHeight)
    find_popup('popupWidth', popupWidth)

    lines_to_write = ''.join(lines_between)

    # Записываем изменения обратно в файл
    with open(args.file, mode='w') as file:
        is_written = False
        for i, line in enumerate(lines):
            if start_index <= i < end_index:
                if is_written is False:
                    file.write(lines_to_write)
                    is_written = True
            else:
                file.write(line)
