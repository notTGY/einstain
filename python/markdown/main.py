import sys
import os

def serialize_lines(raw_lines):
  lines = []
  acc, prev_line = "", ""

  for line in raw_lines:
    if acc != "" and line == "\n":
      lines.append(acc)
      acc = ""
    else:
      acc += line
    prev_line = line

  if acc != "": lines.append(acc)
  return lines

def convert_hs(lines):
  for (i, line) in enumerate(lines):
    for j in range(0, 5):
      if line[j] != '#':
        if j != 0: lines[i] = "<h{}>{}</h{}>".format(j, line[j + 1:], j)
        break
  return lines

def convert_ps(lines):
  for (i, line) in enumerate(lines):
    if line[0] != '<':
      lines[i] = "<p>{}</p>".format(line)
  return lines


if len(sys.argv) < 2:
  print("Pass <input file> as a parameter")
  exit(0)

infile = open(sys.argv[1], "r")
raw_lines = infile.readlines()

lines = convert_ps(
  convert_hs(
    serialize_lines(raw_lines)
  )
)

output = '\n'.join(lines)

if len(sys.argv) > 2:
  outfile = open(sys.argv[2], "w")
  outfile.write(output)
else:
  print(output)
