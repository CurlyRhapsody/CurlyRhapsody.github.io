function SolveQuadratic() {
    const form = document.forms['Equation'];
    // Extract the values
    let input_a = form.elements.a.value;
    let input_b = form.elements.b.value;
    let input_c = form.elements.c.value;
    if ((input_a == '') || (input_b == '') || (input_c == '')) {
        alert('Invalid input: At least one of the blanks are empty');
        return;
    }
    // Extract the numerical values
    const a = Number(input_a);
    const b = Number(input_b);
    const c = Number(input_c);
    if (a == 0) {
        alert('Invalid input: a is 0');
        return;
    }
    // Calculate discriminant
    const discriminant = b * b - 4 * a * c;
    document.getElementById('Discriminant').innerHTML = discriminant.toString();

    // Define real and imaginary parts
    let s1r = 0;
    let s2r = 0;
    let imaginary = 0;

    // Cases for discriminant
    if (discriminant > 0) {
        document.getElementById('SolNature').innerHTML = "2 Distinct Real Roots";
        s1r = (- b + Math.sqrt(discriminant))/(2 * a);
        s2r = (- b - Math.sqrt(discriminant))/(2 * a);
        document.getElementById('Sol1').innerHTML = s1r.toString();
        document.getElementById('Sol2').innerHTML = s2r.toString();
    }
    if (discriminant < 0) {
        document.getElementById('SolNature').innerHTML = "2 Imaginary Roots";
        s1r = (-b/(2 * a));
        imaginary = Math.sqrt(Math.abs(discriminant))/(2 * a);
        let sol1 = s1r.toString() + "+" + imaginary.toString() + 'i';
        let sol2 = s1r.toString() + "-" + imaginary.toString() + 'i';
        document.getElementById('Sol1').innerHTML = sol1.toString();
        document.getElementById('Sol2').innerHTML = sol2.toString();
    }
    if (discriminant == 0) {
        document.getElementById('SolNature').innerHTML = "1 Repeated Root";
        s1r = (-b/(2 * a));
        document.getElementById('Sol1').innerHTML = s1r.toString();
        document.getElementById('Sol2').innerHTML = s1r.toString();
    }

    // Vertex coordinate
    let vertex_x = (-b/(2 * a));
    let vertex_y = a * vertex_x * vertex_x + b * vertex_x + c
    let vertex_coord = "(" + vertex_x + ", " + vertex_y + ")";
    document.getElementById('VertexCoord').innerHTML = vertex_coord.toString();

    // Opening
    if (a < 0) {
        document.getElementById('Opening').innerHTML = "Downwards";
    }
    if (a > 0) {
        document.getElementById('Opening').innerHTML = "Upwards";
    }



    // Sum of roots
    document.getElementById('sor').innerHTML = (-b/a).toString();

    // Product of roots
    document.getElementById('por').innerHTML = (c/a).toString();
}