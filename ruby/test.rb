variable = 'content'
array = ['one', 'two']

# puts 'Hello World, returns nil'
# p 'Hello World, returns this string'
# p variable
# puts ['prints', 'as', 'individual', 'elements']
# p ['prints', 'array', 'as an array']
#p "'gets' gets a value and a newline, chomp removes that'"
#name = gets.chomp
#p name

#comment

$global = "using '$' at the start of a variable name makes it global"
@instance = "using '@' creates an instance variable. Not available to other methods, and only to that instance of that class"
CONSTANT = 'all caps means constant. No semantic meaning, but will provide warnings.'
class TempClass
    @@classVariable = 'available to its class'
end
#likely to have mostly instance and local variables, just cause of how Ruby's put together
#class methods are declared as self.method, and then called with Class.method, while instance methods are declared normally, but must be called from an instance of that class

# seems like you can return automatically from any sort of expression??

variables = 'variables'
# puts "You can stick #{variables} or expressions into a string, so long as you use double quotes"

# many functions have versions with a '!', which means that rather than returning the new value, it's actually modifying the original value

# p variables.sub 'a', 'o'
# p variables.gsub 'a', 'o'

variables.gsub! 'a','o'
# p variables

str = "    gaps    "
# p str.strip

str = 'Hello World and also some other words'
# p str.split
# p str.split 'o'

# p str.split.size

# p 1/100
# p 1.0/100

def method
    p 'method'
    'return value'
end
# p method

def ifWeird
    x = 11
    return 'x is ten' if x == 10
    'x is not ten'
end

# p ifWeird


full_name = Proc.new { |first, last| first + " " + last }
# p full_name['Zack', 'Livingston']
# p full_name.call('Zack', 'Livingston')

fullName = Proc.new do |first, last|
    first + " " + last
end
# p fullName['Zack', 'Livingston']

lambdaFunc = lambda { |first, last| first + " " + last }
# p lambdaFunc['Zack', 'L']

#stabby lambda syntax
stab = -> (first, last) { first + " " + last }
# p stab['Zack', 'Livingston']

# lambda functions count arguments, procs do not, so w/procs you can put in a different number of arguments than there's supposed to be
# procs that use return will return from within a parent method as well, while lambdas will only return to the end of the lambda

# in general, can ignore parenthesis around arguments/parameters, but have to ignore during both the definition and the call, or neither

def named one:, two:, three:
    puts one
    puts two
    puts three
end
#must call it in the following format, but don't need the correct order:
# named one:'a', three:'c', two:'b'

# can set up default arguments with param:val and if you don't pass in anything to param, it'll default to val

def splat *items
    p items
end

# splat 'one', 'two', 'three', 'four', 'five', 'six', 'seven'

def splat2 **items_and_attr
    items_and_attr.each do |item, attr|
        puts "item: #{item}"
        puts "attr: #{attr}"
    end
end

# data = {"one": 1, 'two': 2, 'three': 3, 'four':4, 'five':5, 'six':6, 'seven':7}
# splat2 data

def opt options={}
    puts options[:attr]
    puts options[:attr2]
    puts options[:attr3] # gets ignored 'cause I don't call it with an attr3
end

# opt attr: 'one', attr2: 'two'




# loops

# i = 0
# while i < 5
#     puts i
#     i+=1
# end

# arr = [1,2,3,4,5]
# arr.each do |i|
#     p i
# end

# arr.each {|i| p i}

# for i in 0..5
#     p i
# end

(1..10).to_a.select {|x| x.even?} # creates collection from 1-10, to_a makes it an array, .select is kind of like .filter in js

(1..10).to_a.select(&:even?) # '&:' shortcut basically sets up that |x| x. part, but only for when you are directly calling a method on it and nothing else

# arr = %w(Each word is an array element)
# p arr.select {|word| word.length >= 5}

# p arr.map {|x| x.gsub('a', 'o')}

# hash creates key/value pairs
Hash[[1, 2.1, 3.33, 0.9].map {|x| [x,x.to_i]}] # creates an array of two-element arrays, each containing the original value and the integer version, then takes that 2d array and converts each element into a pair, which it then stores in a hash
#could be done alternatively like so:
# p pairs = [1, 2.1, 3.33, 0.9].map {|x| [x,x.to_i]}
# p Hash[pairs]

# operators like +, -, *, /, are methods in ruby, so they can be used with &: syntax, where doing &:+ basically applies + to the thing
# lets you get away with stuff like:
p [1,2,3,4,5].inject(&:+)
# inject does ??? but it sure makes this work

# append arrays basically like arr[arr.length], can even add values at places higher than the size, will fill subsequent spaces with nil
# can actually just do arr.push(x)
# arr.pop will pop from the end and returns it
# arr.delete_at(index) does exactly what it seems like it should, BUT don't set the array to its return value cause it returns the deleted value
# arr.delete_if(|x| conditional on x)
# arr.join(x) turns an array into a string, each elemented separated by x

# can set up a hash with key:'value', or 'key' => 'value', or :key => 'value'
# you then access them as hash[:key]
# to delete an element, hash.delete(:key)
# can iterate over just keys with hash.each_key, and each value with hash.each_value
# similarly, hash.keys and hash.values will return arrays of just the keys and just the values respectively
# hash.invert swaps key/value pairs to value/key orientation
# hash.merge(another hash) will append the second hash to the end of the first
# hash.to_a turns it into an array


if 1 == 1
    puts 'equal'
else
    puts 'not equal'
end

unless 1 == 1 # for negation? is there a negation operator in ruby?
    puts 'not equal'
else
    puts 'equal'
end
